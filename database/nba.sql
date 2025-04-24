-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nba`
--

-- --------------------------------------------------------

--
-- Table structure for table `nba_championships`
--

CREATE TABLE `nba_championships` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `western_champion` varchar(255) NOT NULL,
  `eastern_champion` varchar(255) NOT NULL,
  `result` varchar(10) NOT NULL,
  `nba_champion` varchar(255) NOT NULL,
  `nba_vice_champion` varchar(255) NOT NULL,
  `final_sweep` tinyint(1) DEFAULT 0,
  `mvp_name` varchar(255) DEFAULT NULL,
  `mvp_height` decimal(3,2) DEFAULT NULL,
  `mvp_height_ft` decimal(3,2) DEFAULT NULL,
  `mvp_position` varchar(50) DEFAULT NULL,
  `mvp_team` varchar(255) DEFAULT NULL,
  `mvp_nationality` varchar(100) DEFAULT NULL,
  `mvp_status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nba_championships`
--

INSERT INTO `nba_championships` (`id`, `year`, `western_champion`, `eastern_champion`, `result`, `nba_champion`, `nba_vice_champion`, `final_sweep`, `mvp_name`, `mvp_height`, `mvp_height_ft`, `mvp_position`, `mvp_team`, `mvp_nationality`, `mvp_status`) VALUES
(2, 1950, 'Minneapolis Lakers', 'Syracuse Nationals', '4–2', 'Minneapolis Lakers', 'Syracuse Nationals', 0, '', 0.00, 0.00, '', '', '', ''),
(3, 1953, 'Minneapolis Lakers', 'New York Knicks', '4–1', 'Minneapolis Lakers', 'New York Knicks', 0, '', 0.00, 0.00, '', '', '', ''),
(4, 1954, 'Minneapolis Lakers', 'Syracuse Nationals', '4–3', 'Minneapolis Lakers', 'Syracuse Nationals', 0, '', 0.00, 0.00, '', '', '', ''),
(5, 1955, 'Fort Wayne Pistons', 'Syracuse Nationals', '3–4', 'Syracuse Nationals', 'Fort Wayne Pistons', 0, '', 0.00, 0.00, '', '', '', ''),
(6, 1956, 'Fort Wayne Pistons', 'Philadelphia Warriors', '1–4', 'Philadelphia Warriors', 'Fort Wayne Pistons', 0, 'B. Pettit', 2.06, 6.76, 'Forward', 'Saint Louis Hawks', 'US', 'Not reached Final'),
(7, 1957, 'St. Louis Hawks', 'Boston Celtics', '3–4', 'Boston Celtics', 'St. Louis Hawks', 0, 'B. Cousy', 1.85, 6.07, 'Guard', 'Boston Celtics', 'US', 'Champion'),
(8, 1958, 'St. Louis Hawks', 'Boston Celtics', '4–2', 'St. Louis Hawks', 'Boston Celtics', 0, 'B. Russell', 2.08, 6.82, 'Center', 'Boston Celtics', 'US', 'Vice-Champion'),
(9, 1959, 'Minneapolis Lakers', 'Boston Celtics', '0–4', 'Boston Celtics', 'Minneapolis Lakers', 0, 'B. Pettit', 2.06, 6.76, 'Forward', 'Saint Louis Hawks', 'US', 'Not reached Final'),
(10, 1960, 'St. Louis Hawks', 'Boston Celtics', '3–4', 'Boston Celtics', 'St. Louis Hawks', 0, 'W. Chamberlain', 2.16, 7.09, 'Center', 'Philadelphia Warriors', 'US', 'Not reached Final'),
(11, 1961, 'St. Louis Hawks', 'Boston Celtics', '1–4', 'Boston Celtics', 'St. Louis Hawks', 0, 'B. Russell', 2.08, 6.82, 'Center', 'Boston Celtics', 'US', 'Champion'),
(12, 1962, 'Los Angeles Lakers', 'Boston Celtics', '3–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'B. Russell', 2.08, 6.82, 'Center', 'Boston Celtics', 'US', 'Champion'),
(13, 1963, 'Los Angeles Lakers', 'Boston Celtics', '2–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'B. Russell', 2.08, 6.82, 'Center', 'Boston Celtics', 'US', 'Champion'),
(14, 1964, 'San Francisco Warriors', 'Boston Celtics', '1–4', 'Boston Celtics', 'San Francisco Warriors', 0, 'O. Robertson', 1.96, 6.43, 'Guard', 'Cincinnati Royals', 'US', 'Not reached Final'),
(15, 1965, 'Los Angeles Lakers', 'Boston Celtics', '1–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'B. Russell', 2.08, 6.82, 'Center', 'Boston Celtics', 'US', 'Champion'),
(16, 1966, 'Los Angeles Lakers', 'Boston Celtics', '3–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'W. Chamberlain', 2.16, 7.09, 'Center', 'Philadelphia 76ers', 'US', 'Not reached Final'),
(17, 1967, 'San Francisco Warriors', 'Philadelphia 76ers', '2–4', 'Philadelphia 76ers', 'San Francisco Warriors', 0, 'W. Chamberlain', 2.16, 7.09, 'Center', 'Philadelphia 76ers', 'US', 'Champion'),
(18, 1968, 'Los Angeles Lakers', 'Boston Celtics', '2–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'W. Chamberlain', 2.16, 7.09, 'Center', 'Philadelphia 76ers', 'US', 'Not reached Final'),
(19, 1969, 'Los Angeles Lakers', 'Boston Celtics', '3–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'W. Unseld', 2.01, 6.59, 'Center', 'Baltimore Bullets', 'US', 'Not reached Final'),
(20, 1970, 'Los Angeles Lakers', 'New York Knicks', '3–4', 'New York Knicks', 'Los Angeles Lakers', 0, 'W. Reed', 2.06, 6.76, 'Center', 'New York Knicks', 'US', 'Champion'),
(21, 1971, 'Milwaukee Bucks', 'Baltimore Bullets', '4–0', 'Milwaukee Bucks', 'Baltimore Bullets', 0, 'K. AJabbar', 2.18, 7.15, 'Center', 'Milwaukee Bucks', 'US', 'Champion'),
(22, 1972, 'Los Angeles Lakers', 'New York Knicks', '4–1', 'Los Angeles Lakers', 'New York Knicks', 0, 'K. AJabbar', 2.18, 7.15, 'Center', 'Milwaukee Bucks', 'US', 'Not reached Final'),
(23, 1973, 'Los Angeles Lakers', 'New York Knicks', '1–4', 'New York Knicks', 'Los Angeles Lakers', 0, 'D. Cowens', 2.06, 6.76, 'Center', 'Boston Celtics', 'US', 'Not reached Final'),
(24, 1974, 'Milwaukee Bucks', 'Boston Celtics', '3–4', 'Boston Celtics', 'Milwaukee Bucks', 0, 'K. AJabbar', 2.18, 7.15, 'Center', 'Milwaukee Bucks', 'US', 'Vice-Champion'),
(25, 1975, 'Golden State Warriors', 'Washington Bullets', '4–0', 'Golden State Warriors', 'Washington Bullets', 0, 'B. McAdoo', 2.06, 6.76, 'Center', 'Buffalo Braves', 'US', 'Not reached Final'),
(26, 1976, 'Phoenix Suns', 'Boston Celtics', '2–4', 'Boston Celtics', 'Phoenix Suns', 0, 'K. AJabbar', 2.18, 7.15, 'Center', 'Los Angeles Lakers', 'US', 'Not reached Final'),
(27, 1977, 'Portland Trail Blazers', 'Philadelphia 76ers', '4–2', 'Portland Trail Blazers', 'Philadelphia 76ers', 0, 'K. A-Jabbar', 2.18, 7.15, 'Center', 'Los Angeles Lakers', 'US', 'Not reached Final'),
(28, 1978, 'Seattle SuperSonics', 'Washington Bullets', '3–4', 'Washington Bullets', 'Seattle SuperSonics', 0, 'B. Walton', 2.11, 6.92, 'Center', 'Portland Trail Blazers', 'US', 'Not reached Final'),
(29, 1979, 'Seattle SuperSonics', 'Washington Bullets', '4–1', 'Seattle SuperSonics', 'Washington Bullets', 0, 'M. Malone', 2.08, 6.82, 'Center', 'Houston Rockets', 'US', 'Not reached Final'),
(30, 1980, 'Los Angeles Lakers', 'Philadelphia 76ers', '4–2', 'Los Angeles Lakers', 'Philadelphia 76ers', 0, 'K. AJabbar', 2.18, 7.15, 'Center', 'Los Angeles Lakers', 'US', 'Champion'),
(31, 1981, 'Houston Rockets', 'Boston Celtics', '2–4', 'Boston Celtics', 'Houston Rockets', 0, 'J. Erving', 2.01, 6.59, 'Forward', 'Philadelphia 76ers', 'US', 'Not reached Final'),
(32, 1982, 'Los Angeles Lakers', 'Philadelphia 76ers', '4–2', 'Los Angeles Lakers', 'Philadelphia 76ers', 0, 'M. Malone', 2.08, 6.82, 'Center', 'Houston Rockets', 'US', 'Not reached Final'),
(33, 1983, 'Los Angeles Lakers', 'Philadelphia 76ers', '0–4', 'Philadelphia 76ers', 'Los Angeles Lakers', 0, 'M. Malone', 2.08, 6.82, 'Center', 'Philadelphia 76ers', 'US', 'Champion'),
(34, 1984, 'Los Angeles Lakers', 'Boston Celtics', '3–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'L. Bird', 2.06, 6.76, 'Forward', 'Boston Celtics', 'US', 'Champion'),
(35, 1985, 'Los Angeles Lakers', 'Boston Celtics', '4–2', 'Los Angeles Lakers', 'Boston Celtics', 0, 'L. Bird', 2.06, 6.76, 'Forward', 'Boston Celtics', 'US', 'Vice-Champion'),
(36, 1986, 'Houston Rockets', 'Boston Celtics', '2–4', 'Boston Celtics', 'Houston Rockets', 0, 'L. Bird', 2.06, 6.76, 'Forward', 'Boston Celtics', 'US', 'Champion'),
(37, 1987, 'Los Angeles Lakers', 'Boston Celtics', '4–2', 'Los Angeles Lakers', 'Boston Celtics', 0, 'M. Johnson', 2.06, 6.76, 'Guard', 'Los Angeles Lakers', 'US', 'Champion'),
(38, 1988, 'Los Angeles Lakers', 'Detroit Pistons', '4–3', 'Los Angeles Lakers', 'Detroit Pistons', 0, 'M. Jordan', 1.98, 6.50, 'Guard', 'Chicago Bulls', 'US', 'Not reached Final'),
(39, 1989, 'Los Angeles Lakers', 'Detroit Pistons', '0–4', 'Detroit Pistons', 'Los Angeles Lakers', 0, 'M. Johnson', 2.06, 6.76, 'Guard', 'Los Angeles Lakers', 'US', 'Vice-Champion'),
(40, 1990, 'Portland Trail Blazers', 'Detroit Pistons', '1–4', 'Detroit Pistons', 'Portland Trail Blazers', 0, 'M. Johnson', 2.06, 6.76, 'Guard', 'Los Angeles Lakers', 'US', 'Not reached Final'),
(41, 1991, 'Los Angeles Lakers', 'Chicago Bulls', '1–4', 'Chicago Bulls', 'Los Angeles Lakers', 0, 'M. Jordan', 1.98, 6.50, 'Guard', 'Chicago Bulls', 'US', 'Champion'),
(42, 1992, 'Portland Trail Blazers', 'Chicago Bulls', '2–4', 'Chicago Bulls', 'Portland Trail Blazers', 0, 'M. Jordan', 1.98, 6.50, 'Guard', 'Chicago Bulls', 'US', 'Champion'),
(43, 1993, 'Phoenix Suns', 'Chicago Bulls', '2–4', 'Chicago Bulls', 'Phoenix Suns', 0, 'C. Barkley', 1.98, 6.50, 'Forward', 'Phoenix Suns', 'US', 'Vice-Champion'),
(44, 1994, 'Houston Rockets', 'New York Knicks', '4–3', 'Houston Rockets', 'New York Knicks', 0, 'H. Olajuwon', 2.13, 6.99, 'Center', 'Houston Rockets', 'Nigeria', 'Champion'),
(45, 1995, 'Houston Rockets', 'Orlando Magic', '4–0', 'Houston Rockets', 'Orlando Magic', 0, 'D. Robinson', 2.16, 7.09, 'Center', 'San Antonio Spurs', 'US', 'Not reached Final'),
(46, 1996, 'Seattle SuperSonics', 'Chicago Bulls', '2–4', 'Chicago Bulls', 'Seattle SuperSonics', 0, 'M. Jordan', 1.98, 6.50, 'Guard', 'Chicago Bulls', 'US', 'Champion'),
(47, 1997, 'Utah Jazz', 'Chicago Bulls', '2–4', 'Chicago Bulls', 'Utah Jazz', 0, 'K. Malone', 2.06, 6.76, 'Forward', 'Utah Jazz', 'US', 'Vice-Champion'),
(48, 1998, 'Utah Jazz', 'Chicago Bulls', '2–4', 'Chicago Bulls', 'Utah Jazz', 0, 'M. Jordan', 1.98, 6.50, 'Guard', 'Chicago Bulls', 'US', 'Champion'),
(49, 1999, 'San Antonio Spurs', 'New York Knicks', '4–1', 'San Antonio Spurs', 'New York Knicks', 0, 'K. Malone', 2.06, 6.76, 'Forward', 'Utah Jazz', 'US', 'Not reached Final'),
(50, 2000, 'Los Angeles Lakers', 'Indiana Pacers', '4–2', 'Los Angeles Lakers', 'Indiana Pacers', 0, 'S. O\'Neal', 2.16, 7.09, 'Center', 'Los Angeles Lakers', 'US', 'Champion'),
(51, 2001, 'Los Angeles Lakers', 'Philadelphia 76ers', '4–1', 'Los Angeles Lakers', 'Philadelphia 76ers', 0, 'A. Iverson', 1.83, 6.00, 'Guard', 'Philadelphia 76ers', 'US', 'Vice-Champion'),
(52, 2002, 'Los Angeles Lakers', 'New Jersey Nets', '4–0', 'Los Angeles Lakers', 'New Jersey Nets', 0, 'T. Duncan', 2.11, 6.92, 'Forward', 'San Antonio Spurs', 'US', 'Not reached Final'),
(53, 2003, 'San Antonio Spurs', 'New Jersey Nets', '4–2', 'San Antonio Spurs', 'New Jersey Nets', 0, 'T. Duncan', 2.11, 6.92, 'Forward', 'San Antonio Spurs', 'US', 'Champion'),
(54, 2004, 'Los Angeles Lakers', 'Detroit Pistons', '1–4', 'Detroit Pistons', 'Los Angeles Lakers', 0, 'K. Garnett', 2.11, 6.92, 'Forward', 'Minnesota Timberwolves', 'US', 'Not reached Final'),
(55, 2005, 'San Antonio Spurs', 'Detroit Pistons', '4–3', 'San Antonio Spurs', 'Detroit Pistons', 0, 'S. Nash', 1.91, 6.27, 'Guard', 'Phoenix Suns', 'Canada', 'Not reached Final'),
(56, 2006, 'Dallas Mavericks', 'Miami Heat', '2–4', 'Miami Heat', 'Dallas Mavericks', 0, 'S. Nash', 1.91, 6.27, 'Guard', 'Phoenix Suns', 'Canada', 'Not reached Final'),
(57, 2007, 'San Antonio Spurs', 'Cleveland Cavaliers', '4–0', 'San Antonio Spurs', 'Cleveland Cavaliers', 0, 'D. Nowitzki', 2.13, 6.99, 'Forward', 'Dallas Mavericks', 'Germany', 'Not reached Final'),
(58, 2008, 'Los Angeles Lakers', 'Boston Celtics', '2–4', 'Boston Celtics', 'Los Angeles Lakers', 0, 'K. Bryant', 1.98, 6.50, 'Guard', 'Los Angeles Lakers', 'US', 'Vice-Champion'),
(59, 2009, 'Los Angeles Lakers', 'Orlando Magic', '4–1', 'Los Angeles Lakers', 'Orlando Magic', 0, 'L. James', 2.03, 6.66, 'Forward', 'Cleveland Cavaliers', 'US', 'Not reached Final'),
(60, 2010, 'Los Angeles Lakers', 'Boston Celtics', '4–3', 'Los Angeles Lakers', 'Boston Celtics', 0, 'L. James', 2.03, 6.66, 'Forward', 'Cleveland Cavaliers', 'US', 'Not reached Final'),
(61, 2011, 'Dallas Mavericks', 'Miami Heat', '4–2', 'Dallas Mavericks', 'Miami Heat', 0, 'D. Rose', 1.91, 6.27, 'Guard', 'Chicago Bulls', 'US', 'Not reached Final'),
(62, 2012, 'Oklahoma City Thunder', 'Miami Heat', '1–4', 'Miami Heat', 'Oklahoma City Thunder', 0, 'L. James', 2.03, 6.66, 'Forward', 'Miami Heat', 'US', 'Champion'),
(63, 2013, 'San Antonio Spurs', 'Miami Heat', '3–4', 'Miami Heat', 'San Antonio Spurs', 0, 'L. James', 2.03, 6.66, 'Forward', 'Miami Heat', 'US', 'Champion'),
(64, 2014, 'San Antonio Spurs', 'Miami Heat', '4–1', 'San Antonio Spurs', 'Miami Heat', 0, 'K. Durant', 2.06, 6.76, 'Forward', 'Oklahoma City Thunder', 'US', 'Not reached Final'),
(65, 2015, 'Golden State Warriors', 'Cleveland Cavaliers', '4–2', 'Golden State Warriors', 'Cleveland Cavaliers', 0, 'S. Curry', 1.91, 6.27, 'Guard', 'Golden State Warriors', 'US', 'Champion'),
(66, 2016, 'Golden State Warriors', 'Cleveland Cavaliers', '4–3', 'Cleveland Cavaliers', 'Golden State Warriors', 0, 'S. Curry', 1.91, 6.27, 'Guard', 'Golden State Warriors', 'US', 'Vice-Champion'),
(67, 2017, 'Golden State Warriors', 'Cleveland Cavaliers', '4-2', 'Golden State Warriors', 'Cleveland Cavaliers', 0, 'R. Westbrook', 1.91, 6.27, 'Guard', 'Oklahoma City Thunder', 'US', 'Not reached Final'),
(68, 2018, 'Golden State Warriors', 'Cleveland Cavaliers', '4-0', 'Golden State Warriors', 'Cleveland Cavaliers', 0, 'J. Harden', 1.96, 6.50, 'Guard', 'Houston Rockets', 'US', 'Not reached Final');

-- --------------------------------------------------------

--
-- Table structure for table `nba_team_championships`
--

CREATE TABLE `nba_team_championships` (
  `team_name` varchar(255) NOT NULL,
  `championships_won` int(11) DEFAULT 0,
  `overall_rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nba_team_championships`
--

INSERT INTO `nba_team_championships` (`team_name`, `championships_won`, `overall_rank`) VALUES
('', 0, NULL),
('Baltimore Bullets', 0, NULL),
('Boston Celtics', 17, 1),
('Buffalo Braves', 0, NULL),
('Chicago Bulls', 6, 3),
('Cincinnati Royals', 0, NULL),
('Cleveland Cavaliers', 1, 12),
('Dallas Mavericks', 1, 12),
('Detroit Pistons', 3, 6),
('Fort Wayne Pistons', 0, NULL),
('Golden State Warriors', 4, 5),
('Houston Rockets', 2, 9),
('Indiana Pacers', 0, NULL),
('Los Angeles Lakers', 11, 2),
('Miami Heat', 3, 6),
('Milwaukee Bucks', 1, 12),
('Minneapolis Lakers', 3, 6),
('Minnesota Timberwolves', 0, NULL),
('New Jersey Nets', 0, NULL),
('New York Knicks', 2, 9),
('Oklahoma City Thunder', 0, NULL),
('Orlando Magic', 0, NULL),
('Philadelphia 76ers', 2, 9),
('Philadelphia Warriors', 1, 12),
('Phoenix Suns', 0, NULL),
('Portland Trail Blazers', 1, 12),
('Saint Louis Hawks', 0, NULL),
('San Antonio Spurs', 5, 4),
('San Francisco Warriors', 0, NULL),
('Seattle SuperSonics', 1, 12),
('St. Louis Hawks', 1, 12),
('Syracuse Nationals', 1, 12),
('Utah Jazz', 0, NULL),
('Washington Bullets', 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `team_mvp`
--

CREATE TABLE `team_mvp` (
  `team_name` varchar(255) NOT NULL,
  `mvp_count` int(11) DEFAULT 0,
  `most_mvp_player` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_mvp`
--

INSERT INTO `team_mvp` (`team_name`, `mvp_count`, `most_mvp_player`) VALUES
('Baltimore Bullets', 1, 'W. Unseld'),
('Boston Celtics', 10, 'L. Bird'),
('Buffalo Braves', 1, 'B. McAdoo'),
('Chicago Bulls', 6, 'M. Jordan'),
('Cincinnati Royals', 1, 'O. Robertson'),
('Cleveland Cavaliers', 2, 'L. James'),
('Dallas Mavericks', 1, 'D. Nowitzki'),
('Golden State Warriors', 2, 'S. Curry'),
('Houston Rockets', 4, 'M. Malone'),
('Los Angeles Lakers', 8, 'S. O\'Neal'),
('Miami Heat', 2, 'L. James'),
('Milwaukee Bucks', 3, 'K. AJabbar'),
('Minnesota Timberwolves', 1, 'K. Garnett'),
('New York Knicks', 1, 'W. Reed'),
('Oklahoma City Thunder', 2, 'R. Westbrook'),
('Philadelphia 76ers', 6, 'W. Chamberlain'),
('Philadelphia Warriors', 1, 'W. Chamberlain'),
('Phoenix Suns', 3, 'S. Nash'),
('Portland Trail Blazers', 1, 'B. Walton'),
('Saint Louis Hawks', 2, 'B. Pettit'),
('San Antonio Spurs', 3, 'T. Duncan'),
('Utah Jazz', 2, 'K. Malone');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nba_championships`
--
ALTER TABLE `nba_championships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nba_team_championships`
--
ALTER TABLE `nba_team_championships`
  ADD PRIMARY KEY (`team_name`);

--
-- Indexes for table `team_mvp`
--
ALTER TABLE `team_mvp`
  ADD PRIMARY KEY (`team_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nba_championships`
--
ALTER TABLE `nba_championships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `team_mvp`
--
ALTER TABLE `team_mvp`
  ADD CONSTRAINT `team_mvp_ibfk_1` FOREIGN KEY (`team_name`) REFERENCES `nba_team_championships` (`team_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
