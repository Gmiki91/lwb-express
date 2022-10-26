const Router = require('express');
const router = Router();
const topicController = require('../controllers/topicController');

router.route('/:subject/:grade').get(topicController.getMany);
router.route('/:id/').delete(topicController.delete);
router.route('/')
    .post(topicController.add)
    .put(topicController.update)

module.exports = router;