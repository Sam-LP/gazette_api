import env from "./env.js"
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Détermination fichier d'environnement
const envFilename = `.env.${env}`

// Import des variables d'environnement
const config = dotenv.config({ path:envFilename }).parsed;

const connectionString = config.DB_CONNECT_STR

const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to DB '+ connectionString)}
    catch (error) {
        console.error('Connected to DB : Error');
        console.error(error);
    }
}
export default connectToDB