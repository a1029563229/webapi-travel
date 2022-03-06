CREATE TABLE IF NOT EXISTS `shop` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '',
  `description` varchar(64) NOT NULL DEFAULT '',
  `type` tinyint unsigned NOT NULL DEFAULT 0,
  `poster` varchar(200) NOT NULL DEFAULT '',
  `score` float NOT NULL DEFAULT 0,
  `tags` varchar(200) NOT NULL DEFAULT '',
  `evaluation` varchar(500) NOT NULL DEFAULT '',
  `address` varchar(200) NOT NULL DEFAULT '',
  `longitude` float NOT NULL DEFAULT 0,
  `latitude` float NOT NULL DEFAULT 0,
  index `type`(`type`)
) engine=InnoDB charset=utf8;

ALTER TABLE `shop` ADD COLUMN 
(`average_cost` smallint NOT NULL DEFAULT 0 COMMENT '人均消费');

CREATE TABLE IF NOT EXISTS `shop_banner` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `shop_id` int NOT NULL DEFAULT 0,
  `url` varchar(255) NOT NULL DEFAULT '',
  index `shop_id`(`shop_id`, `url`)
) engine=InnoDB charset=utf8;