#
# TABLE STRUCTURE FOR: todo
#

use tododb;

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `task` varchar(255) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

