package com.recruitment.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String fromEmail;

    @Value("${mail.from.name}")
    private String fromName;

    @Value("${app.url}")
    private String appUrl;

    @Async
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send email to: {}", to, e);
        }
    }

    @Async
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            
            helper.setFrom(fromEmail, fromName);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            
            mailSender.send(mimeMessage);
            log.info("HTML email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send HTML email to: {}", to, e);
        }
    }

    // Welcome email for new candidates
    public void sendWelcomeEmail(String to, String fullName) {
        String subject = "Welcome to RecruitHub - Your Career Journey Starts Here";
        String htmlContent = buildWelcomeEmailTemplate(fullName);
        sendHtmlEmail(to, subject, htmlContent);
    }

    // Application confirmation email
    public void sendApplicationConfirmation(String to, String fullName, String jobTitle, String companyName) {
        String subject = "Application Received - " + jobTitle;
        String htmlContent = buildApplicationConfirmationTemplate(fullName, jobTitle, companyName);
        sendHtmlEmail(to, subject, htmlContent);
    }

    // Application status update email
    public void sendApplicationStatusUpdate(String to, String fullName, String jobTitle, String status, String notes) {
        String subject = "Application Update - " + jobTitle;
        String htmlContent = buildStatusUpdateTemplate(fullName, jobTitle, status, notes);
        sendHtmlEmail(to, subject, htmlContent);
    }

    // Password reset email
    public void sendPasswordResetEmail(String to, String resetToken) {
        String subject = "Reset Your Password - RecruitHub";
        String resetLink = appUrl + "/reset-password?token=" + resetToken;
        String htmlContent = buildPasswordResetTemplate(resetLink);
        sendHtmlEmail(to, subject, htmlContent);
    }

    // New job request notification for recruiter
    public void sendJobRequestNotification(String to, String recruiterName, String companyName, String contactName) {
        String subject = "New Job Request from " + companyName;
        String htmlContent = buildJobRequestTemplate(recruiterName, companyName, contactName);
        sendHtmlEmail(to, subject, htmlContent);
    }

    // Email Templates
    private String buildWelcomeEmailTemplate(String fullName) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2D68C4 0%, #1E4A8F 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #ffffff; padding: 30px; border: 1px solid #e4e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #2D68C4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Welcome to RecruitHub!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello %s,</h2>
                        <p>Thank you for joining RecruitHub! We're excited to help you find your next career opportunity.</p>
                        <p>With RecruitHub, you can:</p>
                        <ul>
                            <li>Browse thousands of job opportunities from top companies</li>
                            <li>Apply to jobs with just one click</li>
                            <li>Track your application status in real-time</li>
                            <li>Build and manage your professional profile</li>
                        </ul>
                        <a href="%s/candidate/dashboard" class="button">Go to Dashboard</a>
                        <p>If you have any questions, feel free to reach out to our support team.</p>
                        <p>Best regards,<br>The RecruitHub Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 RecruitHub Inc. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(fullName, appUrl);
    }

    private String buildApplicationConfirmationTemplate(String fullName, String jobTitle, String companyName) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #ffffff; padding: 30px; border: 1px solid #e4e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                    .job-details { background: #f5f7fa; padding: 20px; border-radius: 6px; margin: 20px 0; }
                    .button { display: inline-block; background: #2D68C4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">✓ Application Received</h1>
                    </div>
                    <div class="content">
                        <h2>Hi %s,</h2>
                        <p>Great news! Your application has been successfully submitted and is under review.</p>
                        <div class="job-details">
                            <h3 style="margin-top: 0; color: #2D68C4;">%s</h3>
                            <p style="margin: 5px 0;"><strong>Company:</strong> %s</p>
                            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #10B981;">Under Review</span></p>
                        </div>
                        <p>The hiring team will review your application and get back to you soon. We'll keep you updated via email as your application progresses.</p>
                        <a href="%s/candidate/applications" class="button">View My Applications</a>
                        <p>Best of luck with your application!</p>
                        <p>Best regards,<br>The RecruitHub Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 RecruitHub Inc. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(fullName, jobTitle, companyName, appUrl);
    }

    private String buildStatusUpdateTemplate(String fullName, String jobTitle, String status, String notes) {
        String statusColor = switch (status) {
            case "SHORTLISTED" -> "#10B981";
            case "REJECTED" -> "#EF4444";
            case "ON_HOLD" -> "#F59E0B";
            default -> "#3B82F6";
        };

        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #ffffff; padding: 30px; border: 1px solid #e4e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                    .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 15px 0; }
                    .button { display: inline-block; background: #2D68C4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Application Update</h1>
                    </div>
                    <div class="content">
                        <h2>Hi %s,</h2>
                        <p>There's an update on your application for <strong>%s</strong>.</p>
                        <div style="text-align: center;">
                            <span class="status-badge" style="background: %s; color: white;">%s</span>
                        </div>
                        %s
                        <a href="%s/candidate/applications" class="button">View Application Details</a>
                        <p>Thank you for your interest!</p>
                        <p>Best regards,<br>The RecruitHub Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 RecruitHub Inc. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                fullName, 
                jobTitle, 
                statusColor, 
                status.replace("_", " "),
                notes != null && !notes.isEmpty() ? "<p><strong>Recruiter Notes:</strong> " + notes + "</p>" : "",
                appUrl
            );
    }

    private String buildPasswordResetTemplate(String resetLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #ffffff; padding: 30px; border: 1px solid #e4e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #2D68C4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .warning { background: #FEF3C7; padding: 15px; border-left: 4px solid #F59E0B; margin: 20px 0; border-radius: 4px; }
                    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Reset Your Password</h1>
                    </div>
                    <div class="content">
                        <h2>Password Reset Request</h2>
                        <p>We received a request to reset your password. Click the button below to create a new password:</p>
                        <a href="%s" class="button">Reset Password</a>
                        <div class="warning">
                            <p style="margin: 0;"><strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request this reset, please ignore this email.</p>
                        </div>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #2D68C4;">%s</p>
                        <p>Best regards,<br>The RecruitHub Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 RecruitHub Inc. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(resetLink, resetLink);
    }

    private String buildJobRequestTemplate(String recruiterName, String companyName, String contactName) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #2D68C4 0%, #1E4A8F 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #ffffff; padding: 30px; border: 1px solid #e4e7eb; border-top: none; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; background: #2D68C4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">📨 New Job Request</h1>
                    </div>
                    <div class="content">
                        <h2>Hi %s,</h2>
                        <p>You have received a new job request from <strong>%s</strong>.</p>
                        <p><strong>Contact Person:</strong> %s</p>
                        <p>Please review the request details in your dashboard and respond promptly.</p>
                        <a href="%s/recruiter/requests" class="button">View Job Requests</a>
                        <p>Best regards,<br>The RecruitHub Team</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 RecruitHub Inc. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(recruiterName, companyName, contactName, appUrl);
    }
}
