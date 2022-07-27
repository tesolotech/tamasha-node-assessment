const checkAuth = require('../middleware/check_auth');
module.exports = (app) => {
    const food = require('../controllers/food.controller.js');
    // Create a new Food
    app.post('/api/food-taken', food.takenNewFood);
    // get food of specific user
    app.get('/api/food/:userId', food.getFoodByUserId);

    app.get('/api/entry-report/:days', food.getLastXDaysEntry);

    app.get('/api/user-avg-calories/:days', food.getUsersAverageCalories);

}