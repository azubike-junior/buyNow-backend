import express from 'express';
import cors from 'cors'
import connectToDatabase from './database/connection';
import {config} from './config/config';
import appRoute from './api/route';

const app = express();

app.use(cors())
app.use(express.json()); 

connectToDatabase(config)

app.use('/', appRoute)

const port = config.port || 3300

app.listen(port, () => console.log(`server running on port ${port}`)); 
   