const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          error: "Todos os campos são obrigatórios"
        });
      }

      if (!email.includes("@")) {
        return res.status(400).json({
          error: "Email inválido"
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          error: "A senha deve ter no mínimo 8 caracteres"
        })
      }

      if (existingUser.rows.length > 0) {
        return res.status(400).json({
          error: "Email já está em uso"
        });
      }

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

exports.getUsers = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users"
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}