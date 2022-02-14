import express from "express";
import { config } from "dotenv";
import sequelize from './db';
import cors from 'cors';

const models = require('./models/models')

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("server has been started on port " + PORT));
    } catch (e) {
        console.log(e);   
    }
}

start();