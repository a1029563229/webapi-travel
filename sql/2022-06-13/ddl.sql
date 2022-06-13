ALTER TABLE `shop` ADD column (
  `time_consuming` tinyint unsigned DEFAULT 0 COMMENT '预计耗时',
  `specialty` tinyint unsigned DEFAULT 0 COMMENT '归属地特色指数，0-10'
);

CREATE TABLE IF NOT EXISTS `travelling_guideline` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '攻略名称',
  `type` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '攻略类型 1 休闲游  2 充实游',
  `author` varchar(10) DEFAULT '' COMMENT '攻略作者',
  `poster` varchar(200) NOT NULL DEFAULT '' COMMENT '攻略封面',
  `city` varchar(10) NOT NULL DEFAULT '' COMMENT '攻略城市',
  `day` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '攻略天数',
  `tag` varchar(100) DEFAULT '' COMMENT '攻略标签',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间'
) ENGINE=InnoDB CHARSET=utf8 COMMENT='旅游攻略表';

CREATE TABLE IF NOT EXISTS `travelling_guideline_text_item` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `t_guide_id` int unsigned NOT NULL DEFAULT 0 COMMENT '旅游攻略 ID',
  `content` varchar(500) NOT NULL DEFAULT '' COMMENT '文本内容',
  `style` varchar(500) NOT NULL DEFAULT '' COMMENT '文本样式',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间',
  index `idx_t_guide_id`(`t_guide_id`)
) ENGINE=InnoDB CHARSET=utf8 COMMENT='旅游攻略文本 Item 表';

CREATE TABLE IF NOT EXISTS `travelling_guideline_shop_item` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `t_guide_id` int unsigned NOT NULL DEFAULT 0 COMMENT '旅游攻略 ID',
  `shop_id` int unsigned NOT NULL DEFAULT 0 COMMENT '店铺 ID',
  `fields` varchar(150) NOT NULL DEFAULT '' COMMENT '展示字段',
  `images` varchar(30) DEFAULT '' COMMENT '展示图片',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间',
  index `idx_t_guide_id`(`t_guide_id`)
) ENGINE=InnoDB CHARSET=utf8 COMMENT='旅游攻略店铺 Item 表';

CREATE TABLE IF NOT EXISTS `travelling_guideline_image_item` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `t_guide_id` int unsigned NOT NULL DEFAULT 0 COMMENT '旅游攻略 ID',
  `url` varchar(150) NOT NULL DEFAULT '' COMMENT '图片地址',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间',
  index `idx_t_guide_id`(`t_guide_id`)
) ENGINE=InnoDB CHARSET=utf8 COMMENT='旅游攻略店铺 Item 表';

CREATE TABLE IF NOT EXISTS `travelling_guideline_route` (
  `id` int unsigned PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  `t_guide_id` int unsigned NOT NULL DEFAULT 0 COMMENT '旅游攻略 ID',
  `day` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '天数',
  `type` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '类型 1 文本  2 店铺',
  `content` varchar(50) NOT NULL DEFAULT '' COMMENT '内容',
  `start_time` datetime COMMENT '开始时间',
  `time_consuming` tinyint unsigned COMMENT '预计耗时',
  `is_deleted` tinyint unsigned DEFAULT 0 COMMENT '是否删除',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_on` datetime COMMENT '更新时间',
  index `idx_t_guide_id`(`t_guide_id`)
) ENGINE=InnoDB CHARSET=utf8 COMMENT='旅游攻略店铺路线表';