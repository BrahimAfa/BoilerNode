import { to, formatQuery } from './helper';

describe('utils - Helper : TO', () => {
    it('should return hello if it resolves', async () => {
        const { result } = await to(new Promise((resolve) => resolve('hello')));
        expect(result).toBe('hello');
    });

    it('should return error if it rejected', async () => {
        const err = new Error('faild');
        const { error } = await to(new Promise((res, reject) => reject(err)));
        expect(error).toEqual(err);
        expect(error.message).toEqual('faild');
    });
});

describe('utils - Helper : formatQuery', () => {
    const input = {
        status: 'published',
        from: '12-12-2012',
        to: '12-12-202',
        page: 3,
        limit: 40,
        'price-min': 15,
        'price-max': 99,
        'tag-in': ['adidas', 'nike'],
        'title-regex': 'iphone',
    };
    const output = {
        price: { $min: 15, $max: 99 },
        tag: { $in: ['adidas', 'nike'] },
        title: { $regex: 'iphone' },
    };
    it('should return array format the array ', async () => {
        const result = formatQuery(input);
        expect(result).toMatchObject(output);
    });
    it('should return null if query is empty (null)', async () => {
        const result = formatQuery();
        expect(result).toBeNull();
    });
    it('should return null if query is an empty object ({})', async () => {
        const result = formatQuery({});
        expect(result).toBeNull();
    });
});
