
const Users = require('../models/user.model.js');

// Create and save user
exports.createUser = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({ error: "you can't submit empty!!" });
    }
    if (!req.body.name) {
        return res.status(400).send({ error: "Name is required!!" });
    }
    if (!req.body.email) {
        return res.status(400).send({ error: "Email is required!!" });
    }

    if (!req.body.password) {
        return res.status(400).send({ error: "Password is required!!" });
    }
    if (!req.body.userRole) {
        return res.status(400).send({ error: "User role is required!!" });
    }
    if (!req.body.calorie_limit) {
        return res.status(400).send({ error: "User daily caloris limit is required!!" });
    }
    Users.findByEmailId(req.body.email).then((user) => {
        if (user) {
            return res.status(409).json({
                status: 409,
                message: `User Exists with ${req.body.email}`
            })
        } else {
            Users.createUser(req.body).then(result => {
                res.status(200).json({ status: 200, message: 'User successfully created..' });
            }).catch((error) => {
                console.log('catch', error);
                res.status(500).json({ status: 500, error: error });
            })
        }

    }).catch((error) => {
        res.status(500).json({ status: 500, error: error });
    })
};


// Update user calories limit
exports.updateCalorieLimit = (req, res, next) => {
    Users.updateUserCalorieLimitById(req.body.userId, req.body.newLimit).then(reslut => {
        res.status(200).json({ status: 200, message: 'SUCCESS', data: reslut });
    }).catch(error => {
        res.status(500).json({ status: 500, error: error });
    })
}
