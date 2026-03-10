const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        `INSERT INTO users (username, email, password)
        VALUES ($1,$2,$3)
        RETURNING id, username, email`,
        [username, email, hashedPassword]
      );

      res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!validPassword) {
    return res.status(401).json({ error: 'Senha inválida' });
  }

  const token = jwt.sign(
    { userId: user.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};