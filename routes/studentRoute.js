const Router = require('express');
const router = Router();
const authCheck = require('../middleware/authCheck');
const parentCheck = require('../middleware/parentCheck');
const teacherCheck = require('../middleware/teacherCheck');
const studentController = require('../controllers/studentController');

router.route('/')
    .post(authCheck, studentController.register)
    .get(parentCheck, studentController.getChildren)
    .put(authCheck, teacherCheck, studentController.updateStudents)
    .patch(parentCheck, studentController.updateStudent);

router.route('/archive').patch(authCheck, studentController.updateStudentStatus);
router.route('/many/:classes')
    .get(authCheck, teacherCheck, studentController.getMany);

router.route('/food')
    .put(parentCheck, studentController.updateFoodOrder)
    .get(studentController.getAllFoodOrder);

router.route('/results')
    .post(authCheck, teacherCheck, studentController.getResults)
    .put(authCheck, teacherCheck, studentController.giveResult)
    .patch(authCheck, teacherCheck, studentController.updateResult)
// .delete(studentController.deleteResult);


module.exports = router;