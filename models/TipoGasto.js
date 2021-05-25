const { Schema, model } = require('mongoose');

const TipoGastoSchema = Schema({
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' },
    name:{
        type:String,
        require:true,

    }
});


module.exports = model('TipoGasto', TipoGastoSchema );