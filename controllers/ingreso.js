const { response } = require('express');
var moment = require('moment');
const Ingreso = require('../models/Ingreso');

 

const getIngreso = async(req, res = response ) => {
    const uid = req.uid;
    try {

       let ingresos = await Ingreso.find({persona:uid})
                        .populate('tipo');
    
    
        res.status(201).json({
            ok: true,
            ingresos,
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

        let ingreso = new Ingreso( req.body );
        ingreso.persona=uid;
      
        await ingreso.save();
    
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
    
    const ingresoId = req.params.id;
    const uid = req.uid;

    try {

        const ingreso = await Ingreso.findById( ingresoId );

        if ( !ingreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        const nuevoIngreso = {
            ...req.body,
            usuario: uid
        }

        const ingresoActualizado = await Ingreso.findByIdAndUpdate( ingresoId, nuevoIngreso, { new: true } );

        res.json({
            ok: true,
            ingreso: ingresoActualizado
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

    const ingresoId = req.params.id;
    
    try {

        const ingreso = await Ingreso.findById( ingresoId );

        if ( !ingreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo Gasto no existe por ese id'
            });
        }
        await Ingreso.findByIdAndDelete( ingresoId );

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
    getIngreso

}