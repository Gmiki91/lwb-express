const Router = require('express');
const {
  createOrUpdate,
  getAll,
  getOne,
  deleteOne } = require('../db.js');
const router = Router();
const TABLE_NAME = 'students';
router.post('/register', async (req, res) => {
  const { success, data } = await createOrUpdate({ item: req.body, table: TABLE_NAME })
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!' })
});

router.get('/all', async (req, res) => {
  const { success, data } = await getAll({table:TABLE_NAME})
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!' })
});
module.exports = router;