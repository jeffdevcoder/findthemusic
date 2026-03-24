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
    const { title, artist, source, link } = req.body;
    const userId = req.userId;

    

    const result = await pool.query(
      `INSERT INTO songs (title, artist, source, link, user_id) VALUES ($1,$2,$3,$4,$5)`,
      [title, artist, source, link, userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};