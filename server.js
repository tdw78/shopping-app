const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);
const server = http.createServer(app);
const mongoose = require("mongoose")
server.listen(port);
const cors = require("cors");


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
