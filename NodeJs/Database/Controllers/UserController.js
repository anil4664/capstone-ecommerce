const express = require('express');
const router = express.Router();

var { User } = require('../Schema/User');

router.post('/register',(req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.mailId = req.body.mailId;
    user.password = req.body.password;
    User.findOne({mailId : req.body.mailId}, (err, existingUser) => {
        if(existingUser){
            res.json({
                success:false,
                message : 'Account already exists with the given mail id',
            });
        }
        else{
            user.save();
            res.json({
                success:true
            });
        }
    })
})

