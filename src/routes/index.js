const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const rest = require('./rest')
const users = require('./users')
const food = require('./food')
const order = require('./order')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/rest', rest)
router.use('/users', users)
router.use('/food', food)
router.use('/order', order)




module.exports = router;
