import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const mongoURI: string = 'mongodb://localhost:27017/users'
        await mongoose.connect(mongoURI)
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message)
        throw err
    }
}

export default connectDB
