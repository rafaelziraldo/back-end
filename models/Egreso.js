const { Schema, model } = require('mongoose');

const EgresoSchema = Schema({
    persona: { type: Schema.Types.ObjectId, ref: 'Persona' },
    date:{
        type:Date,
        require:true
    },
    cant:{
        type:Number,
        require:true,

    },
    description:{
        type:String,
        require:true        
    },
    tipo:{
        type: Schema.Types.ObjectId, ref: 'TipoGasto'
    }

    
});


module.exports = model('Egreso', EgresoSchema );