const JWT = require('jsonwebtoken')
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../Models/UserSchema');
require('../conn')


// Registeration
router.post('/createuser', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(420).json({ error: 'fill all the fields' })
    }
    try {
        const userexist = await User.findOne({ username: username });
        if (userexist) {
            return res.status(420).json({ error: 'user already exist' })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(password, salt)
        const userregister = await User.create({ username: username, password: secpass });
        res.send(userregister);
    }
    catch (e) {
        return res.status(420).json({ error: 'Something went wrong' })
    }

})

// USER SIGN IN
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(420).json({ error: "fill all the fields" })
    }
    try {
        const userexist = await User.findOne({ username: username });
      
        if (userexist) {
            const passwordcompare = await bcrypt.compare(password, userexist.password);
            if (passwordcompare) {
                const token = await userexist.generateToken();
                res.send({ token, success: true,user:userexist })
            }
            else {
                res.send({ success: false })
            }
        }
        else {
            res.send({ success: false })
        }
    }
    catch (e) {
        res.send({ success: false })
    }


})

module.exports = router;