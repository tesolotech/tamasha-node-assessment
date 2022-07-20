const checkAuth = require('../middleware/check_auth');
module.exports = (app) => {
    const orders = require('../controllers/food.controller.js');
    // Create a new Food
    app.post('/api/food-taken', orders.takenNewFood);
    // get orders of specific user
    app.get('/api/food/:userId', orders.getFoodByUserId);

}