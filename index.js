const express = require("express");
const mysql = require('mysql2');
const app = express();
const port = 8090;
const path = require("path");
const bodyParser = require('body-parser');


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.urlencoded({extended:true}));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'quiz',
    password: 'Sita@#1009'
});

app.get("/login", (req,res)=>{
    res.render("login_page.ejs");
});

app.post("/login", (req,res)=>{
    let {email, password} = req.body;
    let q = `select * from students where email="${email}" and password="${password}"`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            if(result.length > 0)
                res.redirect("/quiz_instructions");
            else
                res.render("login_page.ejs");
        })
    } catch (err) {
        console.log(err);
    }
});

app.get('/quiz_instructions', (req,res)=>{
    res.render("start_quiz.ejs");
})

app.get('/quiz', (req,res)=>{
    res.render("quiz.ejs");
})

app.post('/quiz', (req, res) => {
    const selectedLanguage = req.body.Language;
    res.render('quiz', { selectedLanguage: selectedLanguage });
});



app.listen(port, ()=>{
    console.log(`app is listening to port: ${port}`);
})