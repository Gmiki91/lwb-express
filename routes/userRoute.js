const Router = require('express');
const {
  createOrUpdate,
  getAll,
  getOne,
  deleteOne } = require('../db.js');
const router = Router();
const TABLE_NAME = 'users';
router.post('/signup', async (req, res) => {
  const { success, data } = await createOrUpdate({ item: req.body, table: TABLE_NAME })
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!' })
});

router.post('/login', async (req, res) => {
  const { success, data } = await getOne({ value: req.body.email, key: "email", table: TABLE_NAME })
  if (success && data) {
    if(data.password === req.body.password){
      return res.json({ success, data })
    }
    return res.status(403).json({ success: false, message: 'Wrong email or password' })
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