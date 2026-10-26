
require("dotenv").config();

const app = require("./app");

const PORT = process.env.API_PORT || 3300;

app.listen(PORT, () => {
    console.log(
        `Servidor rodando na porta ${PORT}\nhttp://localhost:${PORT}`
    );
});
