import express from 'express';
import cors from 'cors'
import connectToDatabase from './database/connection';
import {config} from './config/config';

const app = express();

app.use(cors())
app.use(express.json());

connectToDatabase(config)

const port = 3300

app.listen(port, () => console.log(`server running on port ${port}`)); 
   