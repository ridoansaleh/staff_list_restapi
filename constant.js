import dotenv from "dotenv";
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const DATABASE_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@cluster0-shard-00-00.nklo7.mongodb.net:27017,cluster0-shard-00-01.nklo7.mongodb.net:27017,cluster0-shard-00-02.nklo7.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-pk7b7t-shard-0&authSource=admin&retryWrites=true&w=majority`;

const PORT = 3600;

export { DATABASE_URI, PORT };
