CREATE DATABASE forced_choice;

CREATE TABLE `Experiment` (
  `id` int NOT NULL,
  `expName` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `gender` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `Response` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `ExpID` int NOT NULL,
  `imgName` varchar(255) NOT NULL,
  `guess` varchar(50) NOT NULL,
  `confidenceLevel` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserID` (`UserID`),
  KEY `ExpID` (`ExpID`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`id`),
  CONSTRAINT `response_ibfk_2` FOREIGN KEY (`ExpID`) REFERENCES `Experiment` (`id`)
);

INSERT INTO `Experiment` (`id`, `expName`) VALUES
(1, 'jpegReg'),
(2, 'sparseReg'),
(3, 'gaussianReg');

