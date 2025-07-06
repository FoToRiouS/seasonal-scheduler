-- Remove a tabela se ela já existir
DROP TABLE IF EXISTS group_telegram;

-- Cria a tabela novamente
CREATE TABLE group_telegram (
    id BINARY(16) NOT NULL,
    user_id BINARY(16) NOT NULL,
    name VARCHAR(255),
    group_id VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    UNIQUE (user_id, group_id)
)