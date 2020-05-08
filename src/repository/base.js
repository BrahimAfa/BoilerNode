/* eslint-disable max-len */
import { PAGINATE } from '../utils/constants';

const debuger = require('debug')('app:baseController');

export default class BaseRepository {
    constructor(Model) {
        this.Model = Model;
    }

    async search(filter, { params = [], page = 1}) {
        const fieldQuery = params.join(' ');
        const positivePage = Math.max(1, page);
        const skip = (positivePage - 1) * PAGINATE;
        return this.Model.find(filter, fieldQuery).skip(skip).limit(PAGINATE);
    }

    async get(filter, params = []) {
        const fieldQuery = params.join(' ');
        return this.Model.findOne(filter, fieldQuery);
    }

    async create(doc) {
        const model = new this.Model(doc);
        return model.save();
    }

    async update(id, doc) {
        return this.Model.findByIdAndUpdate(id, doc, { new: true, useFindAndModify: false });
    }

    async remove(id) {
        return this.Model.findByIdAndRemove(id);
    }

    async bulkUpdate(filter, doc) {
        return this.Model.updateMany(filter, { $set: doc });
    }

    /**
     * @param {Array | Service[]} docs
     */
    async bulkCreate(docs) {
        return this.Model.insertMany(docs);
    }

    async bulkRemove(filter) {
        return this.Model.deleteMany(filter);
    }
}
