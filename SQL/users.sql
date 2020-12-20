-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 20.12.2020 klo 19:54
-- Palvelimen versio: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_database`
--

-- --------------------------------------------------------

--
-- Rakenne taululle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vedos taulusta `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'Tepa', '$2a$08$w7j98/3li054fiiG/YdewesUSo19zIfq.1Qyg4H4PotIx1HrYKt.K'),
(2, 'Tepa123', '$2a$08$TPgXHwAKLTeIvRnkqQPB6uVUCCj87IQFIgPcG/Sh10aujckijDY9a'),
(3, 'Lollero', '$2a$08$uPIJXtiHv4.6KHhZM943wuoyRGZ29On1k0A8YLTMQpEwFGa8FwL12'),
(4, 'Supra', '$2a$08$cPCEsZ5Pg.KnzKk6DK6teePwIFt7vy1bU45ittoOOHSxhXfntSvkK'),
(5, 'mikko', '$2a$08$2R5KB9OHiHSC.Jl7JWJ/yORxfZKsfrPD/7pZax11mBZBf3zCAoO5i'),
(6, 'Skuubajäbä', '$2a$08$V5RqK2fLNGgQr3L6SKp2y.OJYe.2GFX/M/n5m5P3ioY8je7B1/qGG'),
(7, 'LoriTori', '$2a$08$HQwJdUdlYOC4ZysTZIOPLORsWmdjVpAgRKxk4H3YQ9SRWdYjDaNSu'),
(10, 'Jepa', '$2a$08$vJnxPV4ErJ8DeFQTL/Tc4uXpxx5wsA/keWPAW/DdPPRNH2qivgA3y'),
(11, 'MachoMan', '$2a$08$3OM4/.apcpELNgVka.7m2eZZDSqJCDivq5KcFX6R/836liu2fbjNa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
