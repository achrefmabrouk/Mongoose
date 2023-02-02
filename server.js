const express = require('express')
const mongoose = require('mongoose')
const app=express()
const dotenv=require('dotenv')
dotenv.config()

// Create a person with this prototype:
const personSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    favoriteFoods:[String]
})
const person=mongoose.model('person',personSchema)

//Create and Save a Record of a Model:
let ALain = new person({name:'Alain',age:25,favoriteFoods:['pizza','sandwich']})
 ALain.save((err,data)=>{if(err){console.log(err)}else console.log(data)})


 //Create Many Records with model.create()
 let arrayOfPeple =[
    {name:'Alain',age:25,favoriteFoods:['pizza','sandwich']},
    {name:'Victor',age:17,favoriteFoods:['pizza','nuggets']},
    {name:'Celine',age:40,favoriteFoods:['spaghetti','panini']},
    {name:'Pierre',age:28,favoriteFoods:['chicken','soup']},
    {name:'Alain',age:30,favoriteFoods:['pizza','meals']}
]
const addpeople=person.create(arrayOfPeple,(err,data)=>{
    if (err){console.log(err)}else console.log(data)
})

//Use model.find() to Search Your Database
const findperson =person.find({name:'Alain'},(err,data)=>{
    if (err){console.log(err)}else {console.log(data)}
})
 

//Use model.findOne() to Return a Single Matching Document from Your Database
person.findOne({favoriteFoods:'pizza'},(err,data)=>{
    if (err){console.log(err)}else {console.log(data)}
})


//Use model.findById() to Search Your Database By _id
person.findById('63dbdc60a7765c6379e30e4b',(err,data)=>{
    if (err){console.log(err)}else {console.log(data)}
})


//Perform Classic Updates by Running Find, Edit, then Save
person.findById('63dbdc60a7765c6379e30e4b',(err,data)=>{
    if (err){console.log(err)}else 
    {data.favoriteFoods.push('hamburger')
     data.save((err,result)=>{
        if (err){console.log(err)}else{
            console.log(result)
        }
     })
}
})


//Perform New Updates on a Document Using model.findOneAndUpdate()
person.findOneAndUpdate({name:'Celine'},{age:20},(err,data)=>{
    if (err){console.log(err)}else{console.log(data)}
})


//Delete One Document Using model.findByIdAndRemove
person.findByIdAndRemove('63dbe22e4a1f3cd5c33ae879',(err,data)=>{
    if (err){console.log(err)}else{console.log('person has been deleted')}})


 //MongoDB and Mongoose - Delete Many Documents with model.remove()
 person.remove({name:'Alain'},(err,data)=>{
    if (err){console.log(err)}else{console.log('PEOPLE has been deleted')}})   


    //Chain Search Query Helpers to Narrow Search Results
person.find({favoriteFoods:{$all:['pizza']}}).sort({name:1}).limit(2).select('-age').exec((err,data)=>{
    if (err){console.log(err)}else{console.log(data)}})   



mongoose.set('strictQuery',true)
mongoose.connect(process.env.MONGO_URI,err=>err?console.log(err):console.log('DB is connected'))



const Port = process.env.Port||7000
app.listen(Port,err=>err?console.log(err):console.log(`server is running on ${Port}`))
