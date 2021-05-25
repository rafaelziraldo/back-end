const { Schema, model } = require('mongoose');

const IngresoSchema = Schema({
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
        type: Schema.Types.ObjectId, ref: 'TipoIngreso'
    }

    
});


module.exports = model('Ingreso', IngresoSchema );