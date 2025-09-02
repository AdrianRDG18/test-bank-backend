const { Schema, model } = require('mongoose');

const CurrencySchema = Schema({
    type: {
        type: String,
        required: [
            true, 'The type is required'
        ]
    },
    quantity: {
        type: Number,
        required: [
            true, 'The quantity is required'
        ]
    },
    denomination: {
        type: Number,
        required: [
            true, 'The denomination is required'
        ]
    },
});

// Remove __v and password from the object & convert _id to uid
CurrencySchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Currency', CurrencySchema);