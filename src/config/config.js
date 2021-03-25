import dotenv from 'dotenv';
dotenv.config();

const {URI, dbName, secret, node_env, PAYPAL_CLIENT_ID, accessKeyId, secretAccessKey, port} = process.env;

export const config = {
    URI,
    dbName,
    secret,
    node_env,
    PAYPAL_CLIENT_ID,
    accessKeyId,
    secretAccessKey,
    port
}