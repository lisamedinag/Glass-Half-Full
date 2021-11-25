const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../models/User.model")

// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))

router.post('/signup', (req, res) => {
    const { email, password } = req.body

    // Check if form filled in correctly
    if (password.length === 0 || email.length === 0) {
        res.render('auth/signup', { errorMsg: 'Please fill in all your details' })
        return
    }

    // Check if user exists
    User
        .find({ email })
        .then(user => {

            // If already exists return an error
            if (user.length) {
                res.render('auth/signup', { errorMsg: 'User already exists' })
                return
            }

            // Else we generate the encryption
            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

// Login
router.get('/login', (req, res) => res.render('auth/login'))

router.post('/login', (req, res) => {
    const { email, password } = req.body

    // Check if form filled in correctly
    // if (password.length === 0 || email.length === 0) {
    //     res.render('auth/login', { errorMsg: 'Please fill in all your details' })
    //     return
    // }
    // Check if user exists
    User
        .findOne({ email })
        .then(user => {
            // If user doesn't exist return an error
            if (!user) {
                res.render('auth/login', { errorMsg: 'Invalid user' })
                return
            }

            // If password doesn't match the hash return error
            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMsg: 'Invalid password' })
                return
            }

            // Add the user object to the req.session
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log(err))

})

// Log out
router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router;