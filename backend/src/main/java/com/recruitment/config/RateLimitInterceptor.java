package com.recruitment.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    @Value("${rate.limit.enabled:true}")
    private boolean rateLimitEnabled;

    @Value("${rate.limit.requests:100}")
    private int maxRequests;

    @Value("${rate.limit.duration:60000}")
    private long duration;

    // Map to store request counts per IP
    private final Map<String, RequestCounter> requestCounts = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!rateLimitEnabled) {
            return true;
        }

        String clientIp = getClientIP(request);
        RequestCounter counter = requestCounts.computeIfAbsent(clientIp, k -> new RequestCounter());

        // Clean up old entries
        cleanupExpiredEntries();

        if (counter.increment() > maxRequests) {
            log.warn("Rate limit exceeded for IP: {}", clientIp);
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Too many requests. Please try again later.\"}");
            return false;
        }

        return true;
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }

    private void cleanupExpiredEntries() {
        long currentTime = System.currentTimeMillis();
        requestCounts.entrySet().removeIf(entry -> 
            currentTime - entry.getValue().getTimestamp() > duration
        );
    }

    private class RequestCounter {
        private final AtomicInteger count = new AtomicInteger(0);
        private final long timestamp = System.currentTimeMillis();

        public int increment() {
            return count.incrementAndGet();
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}
