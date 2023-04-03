import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a unique Username, as this will  be used to help find your Peatree'],
        maxlength: [60, 'Username cannot be more than 60 characters'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email address to help recover your account']
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    links: {
        type: Array
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.models.User || mongoose.model('User', UserSchema)