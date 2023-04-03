import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
    const { method } = req;
    const { username, email, password, confirmpassword } = req.body;

    await dbConnect();

    try {
        if(method !== 'POST') {
            throw new Error('This form was not submitted in the appropriate manner.');
        }

        if(!username || !email || !password) {
            throw new Error('Please fill all required fields!');
        }

        const CheckUser = await User.findOne({username});

        if(CheckUser) {
            throw new Error('An account with that username already exists');
        }

        if(password !== confirmpassword) {
            throw new Error('Password\'s do not match!');
        }

        const links = [];

        const user = await User.create({
            username, email, password, links
        })

        if(!user) {
            throw new Error('There was an error registering your account');
        }

        res.status(201).json({success: true, message: "Account was successfully registered!"});
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}