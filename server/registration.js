var express = require('express');//express calling
var mongoose = require("mongoose");//mongoose calling
var app = express();//express module asigning in app
var User = require('./model/user');//user.js file is assigninging in User
app.use(express.static('public'));//for showing public

mongoose.connect( "mongodb://localhost:27017/registrationdb");//give a path for makeing db

var mongo = require('mongodb');//mongodb should asign in mongo
var bodyParser = require('body-parser'); //body-parser moduler asign in body-parser

app.use(bodyParser.json());//will show in json type
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//by get method client's request is getting
app.get('/registration.html', function (req, res) {
    res.sendFile( __dirname + "/" + "registration.html" );
 })
//By post method response is sending to registration page
app.post('/registration_form',urlencodedParser,function(req,res){
    
    var obj = {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            UserName:req.body.UserName,
            Password:req.body.Password,
            Email:req.body.Email,
            Address:req.body.Address,
            City:req.body.City,
            State:req.body.State,
            Country:req.body.Country,
            PinCode:req.body.PinCode,
        }      
            console.log('Body',obj);  
            var user = new User(obj);
        user.save(function(err,data){
            if(err) res.send(err);
            console.log('successfully insert',data);
            res.json(req.body);
        });
  });

  app.get('/getUser.html', function (req, res) {
    res.sendFile( __dirname + "/" + "getUser.html" );
 })  
app.get('/getUsers',function(req,res){
    User.find({},function(err,data){
        if(err) res.send()
        res.json(data);
    });
});

app.get('/login.html', function (req, res) {
    res.sendFile( __dirname + "/" + "login.html" );
 })
//By post method response is sending to login page
app.post('/login_password',urlencodedParser,function(req,res){
        var UserName = req.body.UserName;
        var Password = req.body.Password;  
            User.findOne({UserName:req.body.UserName,Password:req.body.Password},(err,user)=>{
                if(err) return next(err);
                if(!user) return res.send('Not logged in!');       
            res.status(200).json({status:'success',role:user.role});
        })});

app.get('/changepassword.html', function (req, res) {
    res.sendFile( __dirname + "/" + "changepassword.html" );
});
//By post method response is sending to change password page
app.post ('/change_password',urlencodedParser,function(req,res){
        var UserName = req.body.UserName;
        var Password = req.body.Password;
        var NewPassword = req.body.NewPassword;
        var ConfirmPassword = req.body.ConfirmPassword;
            User.findOne({UserName:req.body.UserName,Password: req.body.Password},(err,user)=>{
                if(err) return next(err);
                if(!user) return res.send('Account not available, Create a new Account');   
            User.update({ UserName: req.body.UserName},{ $set: { Password: req.body.NewPassword }},{ multi: true }, callback)
                //function is used for callback to update
                function callback (err, numAffected) {
                // numAffected is the number of updated documents
                {res.status(200).json({status:'password changed'});
                }}});
                });

app.get('/forgetpassword.html', function (req, res) {
    res.sendFile( __dirname + "/" + "forgetpassword.html" );
})
//By post method response is sending to forget password page        
app.post('/forget_password',urlencodedParser,function(req,res){
        var Email = req.body.Email;
        var Password = req.body.NewPassword;
        var ConfirmPassword = req.body.ConfirmPassword;
            User.findOne({Email: req.body.Email},(err,user)=>{
                if(err) return next(err);
                if(!user) return res.send('Account not available, Create a new Account');   
            User.update({ Email: req.body.Email},{ $set: { Password: req.body.NewPassword }},{ multi: true }, callback)
                //function is used for callback to update
                function callback (err, numAffected) {
                // numAffected is the number of updated documents
                { res.status(200).json({status:'password changed'});
                }}});
                });
// for running the surver, use these codes
    var server = app.listen(8086, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://8086", host, port)
     });


