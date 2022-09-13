const Router = require('express');
const router = Router();
const authCheck = require('../middleware/authCheck');
const studentController = require('../controllers/studentController');

router.route('/')
    .post(authCheck, studentController.register)
    .get(authCheck, studentController.getChildren);

router.route('/:classes')
    .get(studentController.getMany);

router.route('/results')
    .post(studentController.getResults)
    .put(studentController.giveResult)
    .patch(studentController.updateResult);    

module.exports = router;