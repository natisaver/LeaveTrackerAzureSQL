// const sql = require('mssql/msnodesqlv8');
const bodyParser = require("body-parser")
const express = require("Express");
const dboperations = require("./dboperations");
const createError = require('http-errors');
const cors = require("cors")    
const dotenv = require("dotenv");
dotenv.config()

const app = express();
const router = express.Router();


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/api", router);

//err middleware to catch 404
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next)=>{
    console.error(err.message); 
    if (!err.statusCode) {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message);
})

//authentication middleware 
router.use((req,res,next)=>{
    console.log("middleware");
    next();
});

router.get("/", (req,res)=>{
    res.json({message: "this is the API"})
})

router.get("/users", (req,res)=>{
    dboperations.getUsers().then(result => {
        console.log("got response")
        res.json(result[0]);
    })
});

router.get("/users/:id", (req,res)=>{
    dboperations.getUser(req.params.id).then(result => {
        console.log("got single user")
        res.json(result[0]);
    })
});

app.get("/", (req,res)=>{
    res.send("home");
})



var port = process.env.PORT || 3002 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);})


    
