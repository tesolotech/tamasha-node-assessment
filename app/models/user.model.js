const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: { type: String, required: true },
    userRole: { type: String, required: true },
    calorie_limit: { type: Number, required: true, default: 0 },

}, {
    timestamps: true
});

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {
        delete ret.__v;
        ret.userId = ret._id.toString();
        delete ret._id;
    },
});

mongoose.set('useFindAndModify', false);
const User = mongoose.model('User', UserSchema);
exports.User = User;

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.findByEmailId = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result);

        })
    })
};

exports.createUser = (user) => {
    console.log('user', user)
    const userObj = new User(user);
    return userObj.save();
};

exports.getUserList = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec(function (err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            })
    });
};

exports.updateUserCalorieLimitById = (userId, newLimit) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: userId }, { $set: { "calorie_limit": newLimit } }, { new: true }).exec(function (error, res) {
            if (error) {
                reject(error);
            } else {
                resolve(res);
            }
        })
    });
}

exports.getUserCalorieDailyLimitByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: userId }).exec((err, result) => {
            if (err) return reject(err);
            return resolve(result.calorie_limit);

        })
    })
}





