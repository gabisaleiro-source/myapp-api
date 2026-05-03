const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const ProcessoController = require('../controllers/processoController');
const TipoPublicidadeController = require('../controllers/tipoPublicidadeController');
const FreguesiaController = require('../controllers/freguesiaController');
const RuaController = require('../controllers/ruaController');

const authMiddleware = require('../middlewares/authMiddleware');

const loadProcesso = require('../middlewares/loadProcesso');
const loadTipoPublicidade = require('../middlewares/loadTipoPublicidade');
const loadFreguesia = require('../middlewares/loadFreguesia');
const loadRua = require('../middlewares/loadRua');

const { storeProcessoRules, validateStoreProcesso } = require('../requests/storeProcessoRequest');
const { updateProcessoRules, validateUpdateProcesso } = require('../requests/updateProcessoRequest');

const { storeTipoPublicidadeRules, validateStoreTipoPublicidade } = require('../requests/storeTipoPublicidadeRequest');
const { updateTipoPublicidadeRules, validateUpdateTipoPublicidade } = require('../requests/updateTipoPublicidadeRequest');

const { storeFreguesiaRules, validateStoreFreguesia } = require('../requests/storeFreguesiaRequest');
const { updateFreguesiaRules, validateUpdateFreguesia } = require('../requests/updateFreguesiaRequest');

const { storeRuaRules, validateStoreRua } = require('../requests/storeRuaRequest');
const { updateRuaRules, validateUpdateRua } = require('../requests/updateRuaRequest');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(authMiddleware);

router.post('/logout', AuthController.logout);
router.get('/user', (req, res) => {
    return res.status(200).json(req.user);
});

router.get('/processos', ProcessoController.index);
router.post('/processos', storeProcessoRules, validateStoreProcesso, ProcessoController.store);
router.get('/processos/:id', loadProcesso, ProcessoController.show);
router.put('/processos/:id', loadProcesso, updateProcessoRules, validateUpdateProcesso, ProcessoController.update);
router.delete('/processos/:id', loadProcesso, ProcessoController.destroy);

router.get('/tipo-publicidades', TipoPublicidadeController.index);
router.post('/tipo-publicidades', storeTipoPublicidadeRules, validateStoreTipoPublicidade, TipoPublicidadeController.store);
router.get('/tipo-publicidades/:id', loadTipoPublicidade, TipoPublicidadeController.show);
router.put('/tipo-publicidades/:id', loadTipoPublicidade, updateTipoPublicidadeRules, validateUpdateTipoPublicidade, TipoPublicidadeController.update);
router.delete('/tipo-publicidades/:id', loadTipoPublicidade, TipoPublicidadeController.destroy);

router.get('/freguesias', FreguesiaController.index);
router.post('/freguesias', storeFreguesiaRules, validateStoreFreguesia, FreguesiaController.store);
router.get('/freguesias/:id', loadFreguesia, FreguesiaController.show);
router.put('/freguesias/:id', loadFreguesia, updateFreguesiaRules, validateUpdateFreguesia, FreguesiaController.update);
router.delete('/freguesias/:id', loadFreguesia, FreguesiaController.destroy);

router.get('/ruas', RuaController.index);
router.post('/ruas', storeRuaRules, validateStoreRua, RuaController.store);
router.get('/ruas/:id', loadRua, RuaController.show);
router.put('/ruas/:id', loadRua, updateRuaRules, validateUpdateRua, RuaController.update);
router.delete('/ruas/:id', loadRua, RuaController.destroy);

module.exports = router;