/* eslint-disable quotes */
import App from '../models/app';
import appValidator from '../validation/app';
import DefaultRepository from '../repository/default';
import APIError from '../utils/error';
import ObjectId from '../validation/objectId';
import { formatQuery, isEmptyObject, to } from '../utils/helper';

const appRepository = DefaultRepository.init(App);
export const search = async (req, res, next) => {
    const { filters = {}, options = {} } = formatQuery(req.query);
    console.log(formatQuery(req.query));
    const { result, error } = await to(appRepository.search(filters, options));
    if (error) next(error);
    return res.status(200).json(result);
};

export const getone = async (req, res, next) => {
    const { filters = {} } = formatQuery(req.query);
    const { _id } = filters;
    if (_id) {
        if (!ObjectId(null, _id)) return next(new APIError(`id : ${_id} is Not a Valid ID`, 400, true));
    }
    const { result, error } = await to(appRepository.get(filters, ['-_id', '-_v']));
    if (error) return next(error);
    return res.status(200).json(result);
};

export const create = async (req, res, next) => {
    const app = req.body;
    const { error: validationError } = appValidator(app);
    if (validationError) {
        validationError.status = 400;
        return next(validationError);
    }
    const { result, error } = await to(appRepository.create(app));
    if (error) return next(error);
    if (!result) return next(new APIError('app Not Found', 404, true));
    return res.status(200).json({ result });
};

export const update = async (req, res, next) => {
    const app = req.body;
    const { id: appId } = req.query;
    if (!ObjectId(null, appId)) return next(new APIError(`App : ${appId} is Not a Valid ID`, 400, true));
    if (isEmptyObject(app)) return next(new APIError('empty Object are not Valid', 400, true));
    const { error: validationError } = await appValidator(app);
    if (validationError) {
        validationError.status = 400;
        return next(validationError);
    }
    const { result, error } = await to(appRepository.update(appId, app));
    if (error) return next(error);
    if (!result) return next(new APIError('app Not Found', 404, true));
    return res.status(200).json({ result });
};

export const remove = async (req, res, next) => {
    const { id: appId } = req.query;
    if (!ObjectId(null, appId)) return next(new APIError(`App : ${appId} is Not a Valid ID`, 400, true));
    const { result, error } = await to(appRepository.remove(appId));
    if (error) return next(error);
    if (!result) return next(new APIError(`app with id ${appId} Not Found`, 404, true));
    return res.status(200).json({ result });
};
