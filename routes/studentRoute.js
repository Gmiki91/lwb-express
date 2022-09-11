const Router = require('express');
const router = Router();
const authCheck = require('../middleware/authCheck');
const studentController = require('../controllers/studentController');

router.route('/')
    .get(studentController.getAll)
    .post(authCheck, studentController.register);

router.route('/results')
    .post(studentController.getResults)
    .put(studentController.giveResult)
    .patch(studentController.updateResult)

router.route('/children')
    .get(authCheck, studentController.getChildren);

module.exports = router;