import mongoose from 'mongoose';

const connectToDatabase = (config) => {
    mongoose.connect(config.URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: config.dbName
    })
    const db = mongoose.connection;

    db.once('open', () => console.log('database connected successfully'))
}

export default connectToDatabase; 