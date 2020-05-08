import fakeApp from '../../__Test__/fixtures/dataFaker/app';

export const getApps = async (req, res) => {
    const { n } = req.query;
    const fakeApps = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < n; i++) {
        fakeApps.push(fakeApp());
    }
    return res.status(200).json(fakeApps);
};

export const create = async (req, res) => res.status(200).json(req.body);
