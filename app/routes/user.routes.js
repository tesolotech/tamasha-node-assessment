
const checkAuth = require('../middleware/check_auth');

module.exports = (app) => {

    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/api/createUser', users.createUser);

    // Update user calorie limit by userid
    app.post('/api/updateCLimit', users.updateCalorieLimit);

}

