import route from '../routes';
import seed from '../routes/seed';
import logErrorService from '../middlewares/errors';

export const initRoutes = (app) => {
    app.use('/api/v1/seed/', seed);
    // this rout manges the whole app
    app.use('/api/v1/', route);
    app.use(logErrorService);
};
export default initRoutes;
