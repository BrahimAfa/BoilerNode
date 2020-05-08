/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';


export default class DefaultRepository {
    static init(Model) {
        let baseName = 'base';
        const { modelName } = Model;
        if (fs.existsSync(`./src/repository/${modelName}.js`)) baseName = modelName;
        const Repository = require(path.join(__dirname, baseName));
        console.log(typeof Repository);
        const { default: Repo } = Repository;
        return new Repo(Model);
    }
}

// export default DefaultRepository;
