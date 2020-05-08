import db from 'mongoose';
const schema = new db.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true },
    tags: [String],
    primary_picture: String,
    total_rating: { type: Number, get() { return this.rating?.length ?? 0; } },
    salesCount: { type: Number },
    url: { type: String }, 
    development: {
        description: String,
        chnageLog: [{
            version: { type: String },
            enhancements: { type: [String] },
            releaseDate: { type: Date, default: new Date() },
        }],
    },
}, { timestamps: true });

const App = db.model('app', schema);
export default App;
