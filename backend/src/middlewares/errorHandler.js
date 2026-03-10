const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: "Erro de validação",
      details: err.errors,
    });
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
  });
};

module.exports = errorHandler;