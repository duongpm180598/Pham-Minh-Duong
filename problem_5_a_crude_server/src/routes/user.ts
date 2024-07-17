import { Router } from 'express'
import { addUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user'

const router: Router = Router()

router.get('/', getUsers)

router.get('/:id', getUserById)

router.post('/add-user', addUser)

router.put('/edit-user/:id', updateUser)

router.delete('/delete-user/:id', deleteUser)

export default router
