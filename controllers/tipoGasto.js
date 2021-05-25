const { response } = require('express');

const TipoGasto = require('../models/TipoGasto');

 

const getTipoGastos = async(req, res = response ) => {
    const uid = req.uid;
    try {

       const tipoGasto = await TipoGasto.find({persona:uid});
        
    
        res.status(200).json({
            ok: true,
            tipoGasto,
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
const getUnoTipoGastos = async(req, res = response ) => {
    
    try {
        const tipoGastoId = req.params.id;

       const tipoGasto = await TipoGasto.findById(tipoGastoId);
        
    
        res.status(200).json({
            ok: true,
            tipoGasto,
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

        tipoGasto = new TipoGasto( req.body );
        tipoGasto.persona=uid;
        await tipoGasto.save();
    
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
    
    const tipoGastoId = req.params.id;
    const uid = req.uid;

    try {

        const tipoGasto = await TipoGasto.findById( tipoGastoId );

        if ( !tipoGasto ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        const nuevoTipoGasto = {
            ...req.body,
            user: uid
        }

        const tipoGastoActualizado = await TipoGasto.findByIdAndUpdate( tipoGastoId, nuevoTipoGasto, { new: true } );

        res.json({
            ok: true,
            tipoGasto: tipoGastoActualizado
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

    const tipoGastoId = req.params.id;
    const uid = req.uid;
    try {

        const tipoGasto = await TipoGasto.findById( tipoGastoId );

        if ( !tipoGasto ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo Gasto no existe por ese id'
            });
        }
        await TipoGasto.findByIdAndDelete( tipoGastoId );

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
    getTipoGastos,
    getUnoTipoGastos

}