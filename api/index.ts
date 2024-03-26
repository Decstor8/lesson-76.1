import { Request, Response, NextFunction } from "express";
// import messagesRouter from "./routes/messages";
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
