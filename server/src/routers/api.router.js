const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const socksRouter = require('./socks.router');
const emailRouter = require('./email.router');

router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/socks', socksRouter);
router.use('/email', emailRouter);

module.exports = router;
