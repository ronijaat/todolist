const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const ToDoList=require('./models/todolist.js');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assests')); 

app.get('/',function(req,res){
    ToDoList.find({},function(err,todolist){
        if(err){
            console.log('Error in fetcging conatct from DB');
            return;
        }
        return res.render('home',{
            title:"Jaat Boy Page",
            contact_list:todolist
        });
    })
});

app.post('/to-do-list',function(req,res){
    ToDoList.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;

    ToDoList.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log("error is happened!!!!!!!!!!!!",err);
        return;
    }
    console.log("server is running at port: ",port);
});