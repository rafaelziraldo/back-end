const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    ingresoTotal:{
        type:Number
    },
    gastoTotal:{
        type:Number        
    },
    disponible:{
        type:Number
    }

    
});


module.exports = model('Persona', PersonaSchema );