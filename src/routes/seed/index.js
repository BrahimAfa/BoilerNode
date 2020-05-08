import express from 'express';
import { getApps } from '../../controller/seed';

const route = express.Router();

route.route('/apps').get(getApps);

export default route;
