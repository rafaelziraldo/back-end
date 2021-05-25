const { Schema, model } = require('mongoose');

const TipoIngresoSchema = Schema({
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' },
    name:{
        type:String,
        require:true,

    }
});


module.exports = model('TipoIngreso', TipoIngresoSchema );