import faker from 'faker';

export default function fakeApp() {
    // const objectId = '5e97ee756387452390af0b85';
    const app = {
        name: faker.company.bsAdjective(),
        price: faker.random.number(100),
        description: faker.lorem.paragraph(3),
        discount: {
            code: faker.lorem.slug(1),
            type: faker.random.arrayElement(['fixed_amount', 'percentage']),
            value: faker.random.number(100),
            endDate: faker.date.future(1, new Date().toISOString()),
        },
        tags: [faker.commerce.department(), faker.commerce.department()],
        primaryPicture: faker.image.abstract(500, 500),
        pictures: [faker.image.abstract(500, 500), faker.image.abstract(500, 500)],
        salesCount: faker.random.number(10),
        pack: [{
            type: faker.random.arrayElement(['basic', 'standard', 'premium']),
            title: faker.lorem.words(3),
            price: faker.random.number(100),
            description: faker.lorem.paragraphs(4),
            delivery: faker.random.number(3), // delivery days
            support: faker.random.number(3),
            features: [faker.lorem.words(2), faker.lorem.words(2)],
        }],
        categories: [{
            name: 'embedded',
            parent: '/electronics',
            category: '/electronics/embedded',
        }],
        url: faker.internet.url(), // url to preview app in action (ex : video link)
        development: {
            description: faker.lorem.paragraph(3),
            chnageLog: [{
                version: faker.system.semver(),
                enhancements: [faker.lorem.paragraph(2)],
                releaseDate: faker.date.recent(2),
            }],
        }, // chnage log for the app
        currentVersion: faker.system.semver(),
        route: faker.internet.url(), // domain.com/admin/apps/facebook-pixel
        permission: [{
            model: 'admin',
            accesse: {
                create: true,
                read: true,
            },
        }],
    };
    return app;
}
