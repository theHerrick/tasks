#
# TABLE STRUCTURE FOR: todo
#

CREATE DATABASE IF NOT EXISTS todo;

USE `todo`;

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO todo(title, body, user) VALUES ('First Post', 'Body of first post.', 'simon@herrick.io'); 

