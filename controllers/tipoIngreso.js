const { response } = require('express');

const TipoIngreso = require('../models/TipoIngreso');

 

const getTipoIngreso = async(req, res = response ) => {
    const uid = req.uid;
    try {

       let tipoIngreso = await TipoIngreso.find({persona:uid});
        
    
        res.status(201).json({
            ok: true,
            tipoIngreso,
            message:"Carga exitosa"
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const crear = async(req, res = response ) => {
    const uid = req.uid;
    try {

        let tipoIngreso = new TipoIngreso( req.body );
        tipoIngreso.persona=uid;
        await tipoIngreso.save();
    
        res.status(201).json({
            ok: true,
            message:"Carga exitosa"
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}
const editar = async( req, res = response ) => {
    
    const tipoIngresoId = req.params.id;
    const uid = req.uid;

    try {

        const tipoIngreso = await TipoIngreso.findById( tipoIngresoId );

        if ( !tipoIngreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        const nuevoTipoIngreso = {
            ...req.body,
            user: uid
        }

        const tipoIngresoActualizado = await TipoIngreso.findByIdAndUpdate( tipoIngresoId, nuevoTipoIngreso, { new: true } );

        res.json({
            ok: true,
            tipoIngreso: tipoIngresoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminar = async( req, res = response ) => {

    const tipoIngresoId = req.params.id;
    
    try {

        const tipoIngreso = await TipoIngreso.findById( tipoIngresoId );

        if ( !tipoIngreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo Gasto no existe por ese id'
            });
        }
        await TipoIngreso.findByIdAndDelete( tipoIngresoId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
module.exports = {
    crear,
    editar,
    eliminar,
    getTipoIngreso

}