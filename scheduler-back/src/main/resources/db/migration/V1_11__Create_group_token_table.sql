CREATE TABLE `group_token`
(
    `user_id` BINARY(16)       NOT NULL,
    `token`   BINARY(16) NOT NULL UNIQUE,
    PRIMARY KEY (`user_id`),
    CONSTRAINT `fk_group_token_user`
        FOREIGN KEY (`user_id`)
            REFERENCES `user` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);