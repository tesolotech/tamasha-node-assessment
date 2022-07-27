const Foods = require('../models/food.model.js');
const Users = require('../models/user.model.js');

// make new entry for specific user
exports.takenNewFood = (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({ error: "you can't submit empty!!" });
    }
    if (!req.body.product_name) {
        return res.status(400).send({ error: "Name is required!!" });
    }
    if (!req.body.taken_date_time) {
        return res.status(400).send({ error: "Food taken date and time is required!!" });
    }

    if (!req.body.calorie_value) {
        return res.status(400).send({ error: "Calorie value is required!!" });
    }
    if (!req.body.userId) {
        return res.status(400).send({ error: "User id is required!!" });
    }

    Foods.getTodayTakenFoodsByUserId(req.body.userId).then(async reslut => {
        if (reslut && reslut.length > 0) {
            let totalCalories = 0;
            for (let i = 0; i < reslut.length; i++) {
                totalCalories = totalCalories + reslut[i]['calorie_value'];
            }
            console.log('totalCalories', totalCalories);
            // totalCalories >= process.env.DAILY_CALORIES_LIMIT
            if (totalCalories >= await getUserDailyLimit(req.body.userId)) {
                return res.status(400).send({ error: "Daily limit exceeded!!" });
            }

            Foods.placeNewFood(req.body).then(reslut => {
                res.status(200).json({ status: 200, message: 'Food successfully Placed..', data: reslut });
            }).catch(error => {
                res.status(500).json({ status: 500, error: error });
            })

        } else {
            console.log('New entry by userid - ', req.body.userId);
            Foods.placeNewFood(req.body).then(reslut => {
                res.status(200).json({ status: 200, message: 'Food successfully Placed..', data: reslut });
            }).catch(error => {
                res.status(500).json({ status: 500, error: error });
            })
        }

    }).catch(error => {
        res.status(500).json({ status: 500, error: error });
    })

}

// Get list of all foods taken by user with there userid
exports.getFoodByUserId = (req, res, next) => {
    console.log(req.params);

    Users.findById(req.params.userId).then(user => {
        if (user && user.length > 0 && user['userRole'] == 'admin') {
            Foods.getFoodList().then(resp => {
                res.status(200).json({ status: 200, message: 'SUCCESS', data: resp });
            }).catch(error => {
                res.status(500).json({ status: 500, error: error });
            })
        } else {
            Foods.getFoodsByUserId(req.params.userId).then(reslut => {
                res.status(200).json({ status: 200, message: 'SUCCESS', data: reslut });
            }).catch(error => {
                res.status(500).json({ status: 500, error: error });
            })
        }
    }).catch(error => {
        res.status(500).json({ status: 500, error: error });
    })


}

async function getUserDailyLimit(userId) {
    let data = '';
    try {
        data = await Users.getUserCalorieDailyLimitByUserId(userId);
    } catch (err) {
        data = "error";
    }
    return data;
}

exports.getLastXDaysEntry = (req, res, next) => {
    if (req.params.days) {
        Foods.getLastXDayEntry(req.params.days).then((result) => {
            res.status(200).json({ status: 200, message: 'SUCCESS', data: result })
        }).catch(error => {
            res.status(500).json({ status: 500, error: error });
        })
    }
}

exports.getUsersAverageCalories = (req, res, next) => {
    if (req.params.days) {
        Foods.getUsersAVGCalaries(req.params.days).then((result) => {
            res.status(200).json({ status: 200, message: 'SUCCESS', data: result })
        }).catch(error => {
            res.status(500).json({ status: 500, error: error });
        })
    }
}
