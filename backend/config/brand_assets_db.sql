-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 19, 2026 at 10:52 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brand_assets_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `reset_token`) VALUES
(1, 'saadsaleem7452@gmail.com', 'admin123', 'bebf74db4b327bd425f6122edb7d74cb2ae43095e1edb03f51a23d9afd3e603d');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int NOT NULL,
  `company_id` int DEFAULT NULL,
  `asset_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `preview_images` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `assets`
--

INSERT INTO `assets` (`id`, `company_id`, `asset_name`, `file_path`, `preview_images`) VALUES
(1, 1, 'LACAS', 'uploads/assets/1771496722363-317682322.zip', 'uploads/assets/1771496722401-746537220.png,uploads/assets/1771496722407-704400343.png'),
(2, 3, 'Fordel SVG,png assets', 'uploads/assets/1771487826526-464155154.zip', 'uploads/assets/1771487826535-161726708.png,uploads/assets/1771487826535-486376898.png,uploads/assets/1771487826538-917336315.png,uploads/assets/1771487826538-868758712.png,uploads/assets/1771487826540-39152294.png');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `primary_color_name` varchar(50) DEFAULT 'Dark Blue',
  `primary_color_hex` varchar(20) DEFAULT '#133651',
  `secondary_color_name` varchar(50) DEFAULT 'Accent Blue',
  `secondary_color_hex` varchar(20) DEFAULT '#73D2E1',
  `primary_font_name` varchar(100) DEFAULT 'Titillium Web',
  `primary_font_link` varchar(255) DEFAULT 'https://fonts.google.com/specimen/Titillium+Web',
  `secondary_font_name` varchar(100) DEFAULT 'Karla',
  `secondary_font_link` varchar(255) DEFAULT 'https://fonts.google.com/specimen/Karla'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `website_url`, `primary_color_name`, `primary_color_hex`, `secondary_color_name`, `secondary_color_hex`, `primary_font_name`, `primary_font_link`, `secondary_font_name`, `secondary_font_link`) VALUES
(1, 'lacasHomeTutors', 'https://lacashometutors.com/', 'Dark Blue', '#133651', 'Accent Blue', '#73D2E1', 'Titillium Web', 'https://fonts.google.com/specimen/Titillium+Web', 'Karla', 'https://fonts.google.com/specimen/Karla'),
(2, 'lacas', 'https://lacashometutors.com', 'orange', '#133651', 'light orange', '#7D2E1', 'Titillium Web', 'https://fonts.google.com/specimen/Titillium+Web', 'Karla', 'https://fonts.google.com/specimen/Karla'),
(3, 'fordel international', 'https://fordelinternational.com', 'light purple', '#746eb2', 'dark blue', '#1c164c', 'Titillium Web', 'https://fonts.google.com/specimen/Titillium+Web', 'Karla', 'https://fonts.google.com/specimen/Karla');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int NOT NULL,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `portfolio_link` varchar(255) DEFAULT NULL,
  `address` text,
  `experience` varchar(100) DEFAULT NULL,
  `profile_pic_path` varchar(255) DEFAULT NULL,
  `qr_code_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `company_id`, `name`, `designation`, `department`, `portfolio_link`, `address`, `experience`, `profile_pic_path`, `qr_code_path`) VALUES
(1, 1, 'Muhammad Saad', 'developer', 'Hod', 'https://saad.hop.com.pk', 'lahore', '5 years', 'uploads/profiles/1771486150701.png', 'uploads/qrcodes/qr_1771486150773.png'),
(2, 3, 'Saad Saleem', 'developer', 'IT Expert', 'https://saad.hop.com.pk', 'lahore', '4 years', 'uploads/profiles/1771487881422-970203063.png', 'uploads/qrcodes/qr_1771487881437.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
