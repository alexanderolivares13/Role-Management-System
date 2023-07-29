const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.listen(PORT, () =>
    console.info(`Server listening on PORT ${PORT}`)
);