import mongoose from 'mongoose';
import baseController from './base';
import ServiceModel from '../models/service';
import fakeService from '../__Test__/fixtures/dataFaker/service';
// const debuger = require('debug')('test:Service');

describe('Base Controller', () => {
    let controller;
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    beforeEach(async () => {
        controller = baseController(ServiceModel);
        ServiceModel.remove({});
    });

    it('inserts a service', async () => {
        // because mongose casts timestampse to date (YYYY....)
        Date.now = jest.fn(() => new Date('2020-01-01T00:00:00.000Z'));
        const service = fakeService();
        const result = await controller.insert(service);
        return expect(result).toMatchObject(service);
    });

    it('lists services', async () => {
        const inserts = await Promise.all(
            [fakeService(), fakeService(), fakeService()].map(controller.insert),
        );
        expect.assertions(inserts.length);

        const found = await controller.getAll();
        inserts.forEach((insert) => {
            expect(found).toContainEqual(insert);
        });
    });

    it('finds a service by id', async () => {
        const service = fakeService();
        const result = await controller.insert(service);
        const found = await controller.getOne(result._id);
        expect(found).toMatchObject(service);
    });
});
