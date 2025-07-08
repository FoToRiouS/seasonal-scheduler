ALTER TABLE watch_service
    ADD COLUMN image_src VARCHAR(2048);

UPDATE watch_service SET image_src = '/internet.png';

ALTER TABLE watch_service
    MODIFY COLUMN image_src VARCHAR(2048) NOT NULL;