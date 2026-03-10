const pool = require('../config/database');
const songSchema = require('../validators/songValidator');

exports.getSongs = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM songs ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.createSong = async (req, res, next) => {
  try {
    const data = songSchema.parse(req.body);

    const result = await pool.query(
      "INSERT INTO songs (title, artist, source, link) VALUES ($1,$2,$3,$4) RETURNING *",
      [data.title, data.artist, data.source, data.link]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};