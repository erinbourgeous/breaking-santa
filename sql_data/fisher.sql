-- phpMyAdmin SQL Dump
-- version 4.0.10.12
-- http://www.phpmyadmin.net
--
-- Host: 127.8.112.130:3306
-- Generation Time: Oct 10, 2016 at 02:38 AM
-- Server version: 5.5.50
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `fisher`
--

--
-- Dumping data for table `person`
--
TRUNCATE `fisher`.`person`;

INSERT INTO `person` (`id`, `name`, `spouse_id`) VALUES
(1, 'Devin', 2),
(2, 'Erin', 1),
(3, 'Anjai', 4),
(4, 'Will', 3),
(5, 'Shann', 6),
(6, 'Chad', 5),
(7, 'Ky', 8),
(8, 'Mari', 7);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
