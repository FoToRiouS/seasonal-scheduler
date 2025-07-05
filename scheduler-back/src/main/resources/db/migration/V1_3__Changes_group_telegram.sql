-- Remove a tabela se ela já existir
DROP TABLE IF EXISTS group_telegram;

-- Cria a tabela novamente
CREATE TABLE group_telegram (
    id BINARY(16) NOT NULL,
    user_id BINARY(36) NOT NULL,
    group_id BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES `user`(id) -- Atenção aqui!
)