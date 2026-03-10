const { z } = require("zod");

const songSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  artist: z.string().min(1, "Artista é obrigatório"),
  source: z.string().min(1, "Origem é obrigatória"),
  link: z.string().url("Link inválido"),
});

module.exports = songSchema;