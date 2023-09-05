const express = require('express')
const User = require('../utils/userModel')
const router = express.Router()
const bcrypt = require('bcrypt')
router.get('/',(req, res)=>{
    return res.render('index',{name: req.session["username"]})
})

router.get('/register',(req, res)=>{
    return res.render('register',{user:'guest'})
})

router.post('/register',async(req,res)=>{
    console.log(req.body.name)
    console.log(req.body['email'])
    username=req.body.name
    email=req.body.email
    phone=req.body.phone
    password=req.body.password


    salt=10
    const encryptedPassword = bcrypt.hashSync(password,salt)
    console.log(encryptedPassword)
    const user = new User({
        username:username,
        email:email,
        phone:phone,
        password:encryptedPassword

    })

    let result = await User.findOne({ email: email });
    console.log(result)
    if (result != null) {
        return res.render('register',{user:'exist'})
    }
    else {
        try{
            let result = await user.save()
            await console.log(`Save successfully result : ${result}`)
            await res.redirect('/login')
        } catch(error) {
            console.log(error);
            return res.redirect('/register')
        }
    }

    // Document instance method
    // try{
    //     let result = await user.save()
    //     await console.log(`Save successfully result : ${result}`)
    //     await res.redirect('/')
    // } catch(error) {
    //     console.log(error);
    //     return res.redirect('/register')
    // }

    // user.save()
    // .then((result) => console.log(`Saved successfully result : ${result}`))
    // .catch(e => console.error(e))
    // user.save((err,result)=>{
    //     if (err.name === 'MongoServerError' && err.code === 11000){
    //         res.redirect('/register')
    //     }

    //     else {
    //         console.log(`Saved successfully result : ${result}`)
    //         res.redirect('/')
    //     }
    // })

    
    // return res.redirect('/')
})

router.get('/login',(req, res)=>{
    return res.render('login',{user:'guest'})
})


router.post('/login',async(req,res)=>{
    console.log(req.body.email)
    console.log(req.body['password'])
    let email = req.body.email
    let password = req.body['password']
    let result = await User.findOne({ email: email });
    console.log(result)
    if (result == null) {
        return res.render('login',{user:'null'})
    }
    else {
        resultPassword = result.password
        const same = bcrypt.compareSync(password, resultPassword) // sync
        console.log(same)
        if (same) {
            req.session["username"] = result.username;
            res.render('index',{name : req.session["username"]})
        } else{
            res.render('login',{user:""})           
        }
                  
    }
    
})

router.get('/logout',function(req, res){
    req.session.destroy(function(){
    req.session;
    });
    res.redirect('/');
});

module.exports = router