import dotenv from 'dotenv';

dotenv.config();

const {URI, dbName, secret, node_env} = process.env;

const config = {
    URI,
    dbName,
    secret,
    node_env
}

export {config}