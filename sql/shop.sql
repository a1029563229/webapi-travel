CREATE TABLE IF NOT EXISTS `shops` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(16) NOT NULL DEFAULT '',
  `description` varchar(64) NOT NULL DEFAULT '',
  `type` tinyint unsigned NOT NULL DEFAULT 0,
  `poster` varchar(200) NOT NULL DEFAULT '',
  `score` float NOT NULL DEFAULT 0,
  `evaluation` varchar(500) NOT NULL DEFAULT '',
  `address` varchar(200) NOT NULL DEFAULT '',
  `longitude` float NOT NULL DEFAULT 0,
  `latitude` float NOT NULL DEFAULT 0,
  index `type`(`type`)
) engine=InnoDB charset=utf8;

CREATE TABLE IF NOT EXISTS `shop_banners` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `shop_id` int NOT NULL DEFAULT 0,
  `url` varchar(255) NOT NULL DEFAULT '',
  index `shop_id`(`shop_id`, `url`)
) engine=InnoDB charset=utf8;

CREATE TABLE IF NOT EXISTS `shop_tags` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `shop_id` int NOT NULL DEFAULT 0,
  -- 标签名为唯一值，节省存储空间
  `name` varchar(50) NOT NULL DEFAULT '' UNIQUE,
  index `shop_id`(`shop_id`, `name`)
) engine=InnoDB charset=utf8;

