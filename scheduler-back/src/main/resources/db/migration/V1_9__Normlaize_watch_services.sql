-- Início do Script SQL para Atualização de Tabelas (Revisado)

-- Passo 1: Excluir o serviço 'Star+' da tabela 'watch_service'.
-- É importante fazer isso APÓS a atualização das associações,
-- para garantir que nenhum anime fique sem serviço associado.
DELETE FROM watch_service
WHERE name = 'Star+';

-- Passo 2: Atualizar a coluna 'name_id' para os serviços existentes.
-- Definimos valores amigáveis para 'name_id' para cada serviço.
UPDATE watch_service
SET name_id = 'crunchyroll'
WHERE name = 'Crunchyroll';

UPDATE watch_service
SET name_id = 'netflix'
WHERE name = 'Netflix';

UPDATE watch_service
SET name_id = 'internet'
WHERE name = 'Internet';

UPDATE watch_service
SET name_id = 'disney-plus'
WHERE name = 'Disney+';

-- Adicionar uma constraint UNIQUE à coluna 'name_id' na tabela 'watch_service'.
-- Isso garantirá que todos os valores na coluna 'name_id' sejam únicos,
-- prevenindo a inserção de registros duplicados para este campo.
ALTER TABLE watch_service
    ADD CONSTRAINT UQ_watch_service_name_id UNIQUE (name_id);

-- Fim do Script SQL
