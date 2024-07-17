import { Document, model, Schema } from 'mongoose'

export type TUser = {
    name: string
    age: string
    gender: string
}

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
})

const User = model<IUser>('User', userSchema)

export default User
