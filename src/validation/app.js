import Joi from '@hapi/joi';

const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    price: Joi.number().min(0),
    description: Joi.string().min(3),
    tags: Joi.array().items(Joi.string()),
    primaryPicture: Joi.string().min(10),
    salesCount: Joi.number().min(0),
    total_rating: Joi.number().min(0),
    // added
    url: Joi.string(),
    development: Joi.object({
        description: Joi.string().min(3),
        chnageLog: Joi.array().items(Joi.object().keys({
            version: Joi.string().min(1).max(6),
            enhancements: Joi.array().items(Joi.string()),
            releaseDate: Joi.date(),
        })),
    }),
});

const appValidation = (service) => schema.validate(service);

export default appValidation;
