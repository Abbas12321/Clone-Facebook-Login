const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const session = require('express-session')
const {v4:uuidv4} = require('uuid')

const path = require('path');
const mainfile = path.join(__dirname)

app.use(express.static(mainfile));
app.use(express.urlencoded({
    extended:true
}))

app.use(session({
    secret: `${uuidv4}`,
    resave:true,
    saveUninitialized:true
}))

const userdata = {
    email : "abbas@gmail.com",
    password : "12345678"
}

app.get("/",(req, res)=>{
    res.sendFile(mainfile +"/index.html");
})

app.post("/form_submit",(req,res)=>{
    if(req.body.email == userdata.email && req.body.password == userdata.password){
        req.session.usermail = req.body.email;
        res.send(`Logged in successfully ${req.session.usermail}`)
    }else{
        res.send("Incorrect Username/password")
    }
})

app.get("/logoutpage",(req,res)=>{
    req.session.destroy((err)=>{
        console.log("destroyed")
    })
    res.send('Logged out successfully')
})

app.listen(port, (err)=>{
    if(err) throw err
    console.log(`server initialized at port ${port}`);
})