import mongoose from 'mongoose';
import config from 'config';
import debug from 'debug';
import { prettyConsole } from '../utils/logger';

const debuger = debug('app:Database');
export const initializeDB = async () => {
    try {
        debuger(config.get('db'));
        await mongoose.connect(config.get('db.host'),
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        debuger('database Connected...');
    } catch (error) {
        debuger('Connection to database not Etablished...');
        prettyConsole(error);
        process.exit(1);
    }
};

export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        debuger('Database Closed...');
    } catch (ex) {
        debuger('Database crushed While Closing...');
        prettyConsole(ex);
        process.exit(1);
    }
};
