const { response } = require('express');
var moment = require('moment');
const Egreso = require('../models/Egreso');

 

const getEgreso = async(req, res = response ) => {
    let uid = req.uid;
    console.log(uid)
    console.log(req.name)
    try {

       let egresos = await Egreso.find({persona:uid})
                        .populate('tipo');
    
    
        res.status(201).json({
            ok: true,
            gasto:egresos,
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
    let uid = req.uid;

    try {

        let egreso = new Egreso( req.body );
        egreso.persona=uid;
       
        await egreso.save();
    
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
    
    const egresoId = req.params.id;
    const uid = req.uid;

    try {

        const egreso = await Egreso.findById( egresoId );

        if ( !egreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        const nuevoEgreso = {
            ...req.body,
            usuario: uid
        }

        const egresoActualizado = await Egreso.findByIdAndUpdate( egresoId, nuevoEgreso, { new: true } );

        res.json({
            ok: true,
            gasto: egresoActualizado
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

    const egresoId = req.params.id;
    
    try {

        const egreso = await Egreso.findById( egresoId );

        if ( !egreso ) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo Gasto no existe por ese id'
            });
        }
        await Egreso.findByIdAndDelete( egresoId );

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
    getEgreso

}