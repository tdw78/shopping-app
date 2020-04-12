module.exports = {
  init(app){
    
    const userRoutes = require("../routes/users");
    const itemRoutes = require("../routes/items");
    
    app.use(userRoutes);
    app.use(itemRoutes);

  }
}