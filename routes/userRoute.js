import { Router } from 'express';
import {
    createOrUpdate,
    getAll,
    getOne,
    deleteOne} from '../db.js';
const router = Router();
const TABLE_NAME = 'users';
router.post('/signup', async(req,res)=>{
    const { success, data } = await createOrUpdate({item:req.body,table:TABLE_NAME})
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

router.get('/all', async(req,res)=>{
    const { success, data } = await getAll()
  if (success) {
    return res.json({ success, data })
  }
  return res.status(500).json({ success: false, message: 'Error Occured !!!'})
});

export default router;