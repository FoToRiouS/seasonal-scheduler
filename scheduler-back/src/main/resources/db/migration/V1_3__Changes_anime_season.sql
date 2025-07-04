ALTER TABLE anime_season_season
    ADD COLUMN preview_text VARCHAR(900),
    ADD COLUMN review_text VARCHAR(900);

UPDATE
    anime_season_season AS ass JOIN
    anime_season AS a ON ass.anime_season_id = a.id
SET
    ass.preview_text = a.preview_text,
    ass.review_text = a.review_text;

ALTER TABLE anime_season
DROP COLUMN preview_text,
DROP COLUMN review_text;