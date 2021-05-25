const { response } = require('express');
const Egreso = require('../models/Egreso');


var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
const getGastosResume = async(req, res = response ) => {
    
    try {

       const egresos = await Egreso.find().populate('tipo');
       const agrupado=groupBy(egresos,'tipo')
        
    
        res.status(200).json({
            ok: true,
            agrupado,
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






module.exports = {
    getGastosResume

}