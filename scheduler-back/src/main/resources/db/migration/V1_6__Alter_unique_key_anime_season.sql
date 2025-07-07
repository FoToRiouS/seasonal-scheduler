-- Excluir a Unique Key existente
ALTER TABLE anime_season
DROP INDEX UK_f52pxc2j1n6lkxw75ms3jorgc;

-- Nova UNIQUE KEY
ALTER TABLE anime_season
ADD UNIQUE KEY UQ_anime_season_id_anime_user_id (id_anime, user_id);