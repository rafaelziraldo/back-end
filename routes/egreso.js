
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crear,editar, eliminar,getEgreso } = require('../controllers/egreso');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post(
    '/new', 
    validarJWT,
    [ // middlewares
        check('cant', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'El nombre es obligatorio').not().isEmpty(),
            
        validarCampos
    ],
    crear
);
router.put(
    '/edit/:id', 
    validarJWT,
    [ // middlewares
        check('cant', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'El nombre es obligatorio').not().isEmpty(),
            
        validarCampos
    ],
    editar
);
router.delete(
    '/delete/:id', 
    validarJWT,
      
    eliminar
);
router.get(
    '/getAll', 
    validarJWT,
    getEgreso
);

module.exports = router;