const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/libraryServer')

const User = mongoose.model('User',{
    username:String,
    email:String,
    password:String,
    repassword:String
})

const Getbooks = mongoose.model('Getbooks',{
    booktitle:String,
    author:String,
    publisher:String,
    image:String,
    pubdate:String,
    countbooks:String
})

const IssuedBooks = mongoose.model('IssuedBooks',{
    booktitle:String,
    author:String,
    username:String,
    pubdate:String
})

const Requestbooks = mongoose.model('Requestbooks',{
    booktitle:String,
    author:String,
    publisher:String
})
module.exports={
    User,
    Getbooks,
    IssuedBooks,
    Requestbooks
}