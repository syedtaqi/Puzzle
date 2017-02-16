-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2014 at 07:17 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `concentration`
--
CREATE DATABASE IF NOT EXISTS `concentration` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `concentration`;

-- --------------------------------------------------------

--
-- Table structure for table `userscores`
--

CREATE TABLE IF NOT EXISTS `userscores` (
  `userid` varchar(10) NOT NULL,
  `lastscore` tinyint(4) NOT NULL,
  `lasttime` time NOT NULL,
  `highscore` tinyint(4) NOT NULL,
  `hightime` time NOT NULL,
  UNIQUE KEY `userid` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
