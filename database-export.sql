-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: recruitment_db
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `recruitment_db`
--

/*!40000 DROP DATABASE IF EXISTS `recruitment_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `recruitment_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `recruitment_db`;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `applied_at` datetime(6) NOT NULL,
  `recruiter_notes` text,
  `status` enum('APPLIED','SHORTLISTED','REJECTED','ON_HOLD') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `candidate_id` bigint NOT NULL,
  `job_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg4e16cwk1qrad923bpx4hamdh` (`candidate_id`),
  KEY `FK65weib1lru9dkrbto5pv389vi` (`job_id`),
  CONSTRAINT `FK65weib1lru9dkrbto5pv389vi` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`),
  CONSTRAINT `FKg4e16cwk1qrad923bpx4hamdh` FOREIGN KEY (`candidate_id`) REFERENCES `candidates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (73,'2026-02-13 13:43:46.819834',NULL,'SHORTLISTED','2026-02-13 13:44:22.068742',35,181);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `experience_years` int DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `skills` text,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_doi1o7iyehcrqrrrbxjostvv5` (`user_id`),
  CONSTRAINT `FKme4fkelukmx2s63tlcrft6hio` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (34,5,'Alex Johnson',NULL,'New York, NY','+1 (555) 987-6543',NULL,'Java, Spring Boot, React, AWS, Docker',73),(35,NULL,'chintan',NULL,'Ahmedabad','92565194115',NULL,NULL,74);
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `industry` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `recruiter_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkvvw3cx7b41ircwpd8pmtsdpk` (`recruiter_id`),
  CONSTRAINT `FKkvvw3cx7b41ircwpd8pmtsdpk` FOREIGN KEY (`recruiter_id`) REFERENCES `recruiters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (67,'Tech Innovations Inc is an industry leader in Technology.','Technology','San Francisco, CA',NULL,'Tech Innovations Inc',17),(68,'Digital Solutions Corp is an industry leader in IT Services.','IT Services','New York, NY',NULL,'Digital Solutions Corp',17),(69,'NextGen Systems is an industry leader in Aerospace.','Aerospace','San Francisco, CA',NULL,'NextGen Systems',17),(70,'CloudNine Analytics is an industry leader in Data Science.','Data Science','New York, NY',NULL,'CloudNine Analytics',17),(71,'Future Finance Group is an industry leader in FinTech.','FinTech','San Francisco, CA',NULL,'Future Finance Group',17),(72,'Seniot\n','Java','India','','Inexture',17);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `name` varchar(255) NOT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoq64wrpwbvd4lq19c3qyxykl0` (`company_id`),
  CONSTRAINT `FKoq64wrpwbvd4lq19c3qyxykl0` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (158,'Responsible for all Engineering initiatives.','Engineering',67),(159,'Responsible for all Product Management initiatives.','Product Management',68),(160,'Responsible for all R&D initiatives.','R&D',69),(161,'Responsible for all Data Engineering initiatives.','Data Engineering',70),(162,'Responsible for all Investment Banking initiatives.','Investment Banking',71),(163,'Senior Software Senior Software','Senior Software',72);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_requests`
--

DROP TABLE IF EXISTS `job_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `job_details` text NOT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `recruiter_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe57wlqyjfq7v2rkyk73ltim50` (`recruiter_id`),
  CONSTRAINT `FKe57wlqyjfq7v2rkyk73ltim50` FOREIGN KEY (`recruiter_id`) REFERENCES `recruiters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_requests`
--

LOCK TABLES `job_requests` WRITE;
/*!40000 ALTER TABLE `job_requests` DISABLE KEYS */;
INSERT INTO `job_requests` VALUES (6,'GOOG','tech@gmail.com','Tech Mah','1234567890','2026-02-13 13:47:22.006288','Backend','ddd\n','PENDING','2026-02-13 13:47:22.006317',17);
/*!40000 ALTER TABLE `job_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` text NOT NULL,
  `experience_max` int DEFAULT NULL,
  `experience_min` int DEFAULT NULL,
  `job_type` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `skills` text,
  `status` enum('OPEN','ON_HOLD','CLOSED') NOT NULL,
  `title` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `company_id` bigint NOT NULL,
  `department_id` bigint NOT NULL,
  `recruiter_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrtmqcrktb6s7xq8djbs2a2war` (`company_id`),
  KEY `FKt27140un7et9j2mqcevbh4shk` (`department_id`),
  KEY `FKd8fvy5t8ref40fode1t1bku14` (`recruiter_id`),
  CONSTRAINT `FKd8fvy5t8ref40fode1t1bku14` FOREIGN KEY (`recruiter_id`) REFERENCES `recruiters` (`id`),
  CONSTRAINT `FKrtmqcrktb6s7xq8djbs2a2war` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`),
  CONSTRAINT `FKt27140un7et9j2mqcevbh4shk` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (181,'2026-02-13 11:30:59.257482','We are seeking a talented Senior Frontend Developer to join our growing team. Key responsibilities include...',8,3,'Full-time','San Francisco, CA','React, TypeScript, CSS','OPEN','Senior Frontend Developer','2026-02-13 11:30:59.257532',67,158,17),(182,'2026-02-13 11:30:59.304331','We are seeking a talented Product Owner to join our growing team. Key responsibilities include...',8,3,'Full-time','New York, NY','Java, Python, SQL','OPEN','Product Owner','2026-02-13 11:30:59.304361',68,159,17),(183,'2026-02-13 11:30:59.327608','We are seeking a talented Systems Architect to join our growing team. Key responsibilities include...',8,3,'Full-time','San Francisco, CA','React, TypeScript, CSS','OPEN','Systems Architect','2026-02-13 11:30:59.327643',69,160,17),(184,'2026-02-13 11:30:59.378457','We are seeking a talented Data Scientist to join our growing team. Key responsibilities include...',8,3,'Full-time','New York, NY','Java, Python, SQL','OPEN','Data Scientist','2026-02-13 11:30:59.378497',70,161,17),(185,'2026-02-13 11:30:59.423460','We are seeking a talented Financial Analyst to join our growing team. Key responsibilities include...',8,3,'Full-time','San Francisco, CA','React, TypeScript, CSS','OPEN','Financial Analyst','2026-02-13 11:30:59.423502',71,162,17),(186,'2026-02-13 13:41:24.586557','Senior Software EnginerSenior Software EnginerSenior Software EnginerSenior Software EnginerSenior Software EnginerSenior Software Enginer ',5,3,'Full-time','Ahmedabad','Java ','OPEN','Senior Software Enginer','2026-02-13 13:41:24.586576',72,163,17);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `used` bit(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_71lqwbwtklmljk3qlsugr1mig` (`token`),
  KEY `FKk3ndxg5xp6v7wd4gjyusp15gq` (`user_id`),
  CONSTRAINT `FKk3ndxg5xp6v7wd4gjyusp15gq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recruiters`
--

DROP TABLE IF EXISTS `recruiters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recruiters` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` text,
  `company_name` varchar(255) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `description` text,
  `website` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_lhuhr3tmewk16uubn7q6w28t6` (`user_id`),
  CONSTRAINT `FK1edjvp9udx35rophqr7imremb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recruiters`
--

LOCK TABLES `recruiters` WRITE;
/*!40000 ALTER TABLE `recruiters` DISABLE KEYS */;
INSERT INTO `recruiters` VALUES (17,'123 Market St, San Francisco, CA 94103','Elite Talent Solutions','+1 (555) 012-3456','Connecting top-tier talent with world-class organizations.','https://elitetalent.com',72);
/*!40000 ALTER TABLE `recruiters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','RECRUITER','CANDIDATE') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (71,_binary '','2026-02-13 11:30:58.354806','admin@recruithub.com','$2a$10$/Ke3Xls8533n6gjNu45z6.m37cePJhtRMEFMbrys60C4kKKvZSbo6','ADMIN','2026-02-13 11:30:58.354914'),(72,_binary '','2026-02-13 11:30:58.511342','recruiter@recruithub.com','$2a$10$7FxImmGpw.0QZrBK79mDme.vkAEifO3Y3HI5l2kDwy8xNoUPRJ.We','RECRUITER','2026-02-13 11:30:58.511367'),(73,_binary '','2026-02-13 11:30:58.681946','candidate@recruithub.com','$2a$10$EM8inwvDrgviFtN30LVMueF0J7PEbeNPbVcISDZFafM9Jm1lwc4Za','CANDIDATE','2026-02-13 11:30:58.681974'),(74,_binary '','2026-02-13 13:43:37.072124','chinatn@gmail.com','$2a$10$.QGdiEuCwLVrkWx.rANnm.Gous9ND/u3vZQoUqKTzBqPN0iGiRDfG','CANDIDATE','2026-02-13 13:43:37.072169');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'recruitment_db'
--

--
-- Dumping routines for database 'recruitment_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-15 21:09:36
