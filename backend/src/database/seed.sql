INSERT INTO media (title, type)
VALUES
('Bleach', 'anime'),
('Breaking Bad', 'serie'),
('Interstellar', 'filme')
ON CONFLICT DO NOTHING;