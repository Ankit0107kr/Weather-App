const express = require("express");
const app = express();
const port = 8000;
const path=require("path");
const hbs=require("hbs");

// console.log(path.join(__dirname , "../public"));
const staticPath=path.join(__dirname , "../public");
const templates_path=path.join(__dirname , "../templates/views");
const partials_path=path.join(__dirname , "../templates/partials");


app.set('view engine', 'hbs');
app.set("views", templates_path);
app.use(express.static(staticPath));
hbs.registerPartials(partials_path); 

app.get("/" , (req,res) =>{
res.render('index'); 

});
app.get("/about" , (req,res) =>{
    res.render('about');
});


app.get("/weather" , (req,res) =>{
    res.render('weather');
});

app.get("*" , (req,res) =>{
    res.render('404error');
});


app.listen(port , ()=>{
    console.log(`listening to the port number ${port}`)  
});