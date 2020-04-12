const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);
const server = http.createServer(app);
const mongoose = require("mongoose")
server.listen(port);
const cors = require("cors");
const Item = require("./models/Item");
const io = require("socket.io").listen(server);

io.on('connection', (socket) => {
  console.log("a user has connected")
  
  socket.on('new item', newItem => { 
    const item = new Item({
      name: newItem.name,
      quantity: newItem.quantity,
      userId: newItem.userId
    });
    item.save()
      .then((item) => {
        io.emit('new item', item);
    })
      .catch((err) => {
        console.log(err)
    });
  });
  

  socket.on('updated item', updatedItem => { 
    const newItem = {
      name: updatedItem.name,
      quantity: updatedItem.quantity,
      userId: updatedItem.userId,
      status: updatedItem.status
    };
  
     Item.findOne({_id: updatedItem._id})
      .then(item => {
        item.updateOne(newItem)
         .then((item) => {
           io.emit('updated item', item)
       })
     })
     .catch((err) => {
       console.log(err)
    })
  })

  socket.on('deleted item', data => { 
    io.emit('deleted item', data);
   })
 });

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});

if((process.env.NODE_ENV = 'development')) {
  app.use(cors({origin: `http://localhost:3000`}));
}

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
 .then(() => 
   console.log("DB connected"))
 .catch((err) => 
   console.log("DB CONNECTION ERROR: ", err));
