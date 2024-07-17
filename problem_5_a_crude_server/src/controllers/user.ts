import { Request, Response } from 'express'
import User, { IUser } from '../models/User'

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
}

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findOne({ _id: req.params.id })
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
}

const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body

        const user: IUser = new User(body)

        const newUser: IUser = await user.save()

        res.status(201).json({ message: 'User added', user: newUser })
    } catch (error) {
        throw error
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateUser: IUser | null = await User.findByIdAndUpdate({ _id: id }, body)
        res.status(200).json({
            message: 'User updated',
            user: updateUser,
        })
    } catch (error) {
        throw error
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleteUser: IUser | null = await User.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: 'User deleted',
            user: deleteUser,
        })
    } catch (error) {
        throw error
    }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser }
