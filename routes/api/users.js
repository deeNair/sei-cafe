const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

/*router.post('/',(req,res)=>{
    //recieve data from form , in body.json as string
    //res.send(req.body)
    //console.log(req.body);

})
router.post('/',userCtrl.create)*/

//routing logic, whatever comes here route it to controller/api/users

router.post('/',usersCtrl.create);
router.post('/login',usersCtrl.login);
router.get('/check-token',ensureLoggedIn,usersCtrl.checkToken)

module.exports =router;