import { Router } from 'express'
import userControllers from '../controllers/userControllers'

const router = Router()


router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/:id', userControllers.fetchUserById);

export default router
    