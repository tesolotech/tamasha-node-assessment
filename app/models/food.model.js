const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FoodSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    taken_date_time: {
        type: Date,
        default: Date.now
    },
    calorie_value: { type: Number, default: 0 },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },


}, {
    timestamps: true
});

mongoose.set('useFindAndModify', false);
const Food = mongoose.model('Food', FoodSchema);
exports.Food = Food;

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Food.findOne({ _id: id }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.placeNewFood = (food) => {
    const foodObj = new Food(food);
    return foodObj.save();
}

exports.getFoodsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Food.find({ userId: userId }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

exports.getTodayTakenFoodsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        Food.find({
            userId: userId
        }, {
            $where: function () {
                today = new Date(); //
                today.setHours(0, 0, 0, 0);
                return (this._id.getTimestamp() >= today)
            }
        }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

exports.getFoodList = () => {
    return new Promise((resolve, reject) => {
        Food.find()
            .exec(function (err, food) {
                if (err) {
                    reject(err);
                } else {
                    resolve(food);
                }
            })
    });
};

exports.getLastXDayEntry = (days) => {
    return new Promise((resolve, reject) => {
        Food.find(
            { 'createdAt': { '$gte': new Date((new Date().getTime() - (parseInt(days) * 24 * 60 * 60 * 1000))) } }
        ).exec(function (err, food) {
            if (err) {
                reject(err);
            } else {
                resolve(food);
            }
        })
    });
}

exports.getUsersAVGCalaries = (days) => {
    return new Promise((resolve, reject) => {
        Food.aggregate([

            {
                $match:
                {
                    'createdAt': { '$gte': new Date((new Date().getTime() - (parseInt(days) * 24 * 60 * 60 * 1000))) }
                }
            },

            {
                $group: {
                    "_id": "$userId",
                    "average": { $avg: "$calorie_value" }
                }
            }

        ]).exec(function (err, food) {
            if (err) {
                reject(err);
            } else {
                resolve(food);
            }
        })
    });
}






// Food.aggregate({
//     "$match": {
//         '_id.createdAt': { '$gte': new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) },
//         "$group": {
//             "_id": "userId",
//             "average": { $avg: "calorie_value" }
//         }
//     })