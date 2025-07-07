-- Exclui todos os registros da tabela user
DELETE FROM user;

INSERT INTO user (id, username, password, name, email, phone, profile_image_src)
VALUES (
    UUID_TO_BIN(UUID()), -- Gera um UUID e converte para BINARY(16)
    'primeiro_usuario',              -- Nome de usuário
    'senha_segura_123',              -- Senha (em um ambiente real, use um hash de senha)
    'Usuário Padrão',                -- Nome completo
    'usuario.padrao@example.com',    -- Email
    '99999999999',                   -- Telefone
NULL                             -- profile_image_src (pode ser NULL ou um URL)
);

-- Adicionar a coluna user_id à tabela anime_season
ALTER TABLE anime_season
    ADD COLUMN user_id BINARY(16);

-- Atualizar registros existentes em anime_season com o ID do primeiro usuário
-- Esta etapa usa uma subconsulta para obter o ID do primeiro usuário automaticamente.
UPDATE anime_season
SET user_id = (SELECT id FROM user ORDER BY created_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- Alterar a coluna user_id para NOT NULL
-- Isso só deve ser feito APÓS a etapa de atualização, para garantir que todos os registros tenham um valor.
ALTER TABLE anime_season
    MODIFY COLUMN user_id BINARY(16) NOT NULL;

-- Adicionar a chave estrangeira
ALTER TABLE anime_season
    ADD CONSTRAINT fk_anime_season_user
        FOREIGN KEY (user_id) REFERENCES user(id);