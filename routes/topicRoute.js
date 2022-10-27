const Router = require('express');
const router = Router();
const topicController = require('../controllers/topicController');
const authCheck = require('../middleware/authCheck');
const teacherCheck = require('../middleware/teacherCheck');

router.route('/:subject/:grade').get(authCheck,topicController.getMany);
router.route('/:id/').delete(authCheck,teacherCheck,topicController.delete);
router.route('/')
    .post(authCheck,teacherCheck,topicController.add)
    .put(authCheck,teacherCheck,topicController.update)

module.exports = router;