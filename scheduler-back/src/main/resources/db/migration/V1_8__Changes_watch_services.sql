-- Início do Script SQL para Atualização de Tabelas

-- Passo 1: Atualizar todas as associações de 'Star+' para 'Disney+' na tabela 'anime_service'.
-- Usamos subconsultas para obter os IDs binários corretos dos serviços 'Star+' e 'Disney+'
-- com base em seus nomes, garantindo que a atualização seja precisa,
-- independentemente dos valores UUID específicos.
UPDATE anime_service
SET service_id = (SELECT id FROM watch_service WHERE name = 'Disney+')
WHERE service_id = (SELECT id FROM watch_service WHERE name = 'Star+');

-- Passo 2: Adicionar a nova coluna 'name_id' à tabela 'watch_service'.
-- Esta coluna será do tipo VARCHAR(255) e é definida como NOT NULL.
-- Um valor padrão de string vazia ('') é fornecido para compatibilidade com linhas existentes,
-- caso a tabela já contenha dados. Recomenda-se popular esta coluna com valores significativos
-- após a execução deste script, se houver dados existentes.
ALTER TABLE watch_service
    ADD COLUMN name_id VARCHAR(255) NOT NULL DEFAULT '';

-- Passo 3: Remover a coluna 'color' da tabela 'watch_service'.
-- Esta coluna não será mais necessária após as alterações.
ALTER TABLE watch_service
    DROP COLUMN color;

-- Passo 4: Inserir os novos serviços 'Amazon Prime' e 'HBO Max' na tabela 'watch_service'.
-- Para o 'id', usamos UUID_TO_BIN(UUID()) para gerar um UUID único e convertê-lo para o formato BINARY(16).
-- Os valores para 'name_id' são slugs amigáveis para identificação.

-- Inserir Amazon Prime
INSERT INTO watch_service (id, name, image_src, name_id)
VALUES (UUID_TO_BIN(UUID()), 'Amazon Prime', '/services/amazon_prime.png', 'amazon-prime');

-- Inserir HBO Max
INSERT INTO watch_service (id, name, image_src, name_id)
VALUES (UUID_TO_BIN(UUID()), 'HBO Max', '/services/hbo_max.png', 'hbo-max');

-- Fim do Script SQL
