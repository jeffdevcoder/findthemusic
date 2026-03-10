require("dotenv").config();

const { execSync } = require("child_process");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

try {
  console.log("Criando banco (se não existir)...");

  execSync(
    `PGPASSWORD=${dbPassword} createdb -U ${dbUser} -h ${dbHost} ${dbName}`,
    { stdio: "inherit" }
  );

} catch (err) {
  console.log("Banco já existe ou erro ignorado");
}

try {
  console.log("Aplicando schema...");

  execSync(
    `PGPASSWORD=${dbPassword} psql -U ${dbUser} -h ${dbHost} -d ${dbName} -f src/database/schema.sql`,
    { stdio: "inherit" }
  );

} catch (err) {
  console.error("Erro ao aplicar schema");
}

try {
  console.log("Inserindo seeds...");

  execSync(
    `PGPASSWORD=${dbPassword} psql -U ${dbUser} -h ${dbHost} -d ${dbName} -f src/database/seed.sql`,
    { stdio: "inherit" }
  );

} catch (err) {
  console.log("Seed não encontrado ou erro ignorado");
}

console.log("Setup finalizado!");