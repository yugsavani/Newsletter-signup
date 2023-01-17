const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const request= require("request");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){

    const firstName= req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }

        ]
    };

    const  jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/47646f933c" 

    const options={
        method:"post",
        auth:"Yugant:42844f27984b1445f81e98114873bb62-us21"
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data" , function(data){
            console.log(JSON.parse(data));
        } )
    })
    request.write(jsonData);
    request.end();

    app.post("/failure", function(req,res){
        res.redirect("/");
    });

});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server live on port 3000");
});



// 42844f27984b1445f81e98114873bb62-us21

// 47646f933c