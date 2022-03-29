CREATE TABLE IF NOT EXISTS `user` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT,
  `open_id` varchar(255) NOT NULL DEFAULT '',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `mobile` int unsigned NOT NULL DEFAULT 0,
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `role` tinyint unsigned NOT NULL DEFAULT 0,
  index `open_id`(`open_id`)
) engine=InnoDB charset=utf8;

alter table `user` add column
(`gender` tinyint unsigned NOT NULL DEFAULT 0,
`country` varchar(50) NOT NULL DEFAULT '',
`province` varchar(50) NOT NULL DEFAULT '',
`city` varchar(50) NOT NULL DEFAULT '');