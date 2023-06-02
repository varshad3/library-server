// import express
const express=require('express')
// import cors
const cors=require('cors')
const { json } = require('express')

// create server using express
const server=express()
const logic = require('./services/logic')
 const jwt= require('jsonwebtoken')
// use cors in server app
server.use(cors({
    origin:'http://localhost:4200'
}))


// use express-json
server.use(express.json())



//  setup port for server app
server.listen(3000,()=>{
    console.log("Library app run at port number 3000");
})

const appMiddleware=(req,res,next)=>{
    console.log('apploication using middle eware');
next()
}
server.use(appMiddleware)


const jwtMiddleware=(req,res,next)=>{
    console.log('jwt middle eware');
const token=req.headers['verify-token']
console.log(token);
try
{const data=jwt.verify(token,'secretkey123')
console.log(data);
next()
}
catch{
res.status(401).json({message:"please login"})
}
}

// library server side

// register

server.post('/register',(req,res)=>{
    console.log('this is inside register api');
    console.log(req.body);

    logic.register(req.body.username,
        req.body.email,
        req.body.password,
        req.body.repassword).then((result)=>{
            res.status(result.statusCode).json(result)

        })

    })


// login

server.post('/login',(req,res)=>{
    console.log('inside logn api');
    console.log(req.body);
    logic.login(req.body.username,
        req.body.password).then((result)=>{
            res.status(result.statusCode).json(result)  
        })
})

// adminlogin

server.post('/adminlogin',(req,res)=>{
    console.log('inside adminlogin api');
    console.log(req.body);
    logic.login(req.body.username,
        req.body.password).then((result)=>{
            res.status(result.statusCode).json(result)  
        })
})

server.get('/get-email/:username',jwtMiddleware,(req,res)=>{
    console.log('inside getemail api');
    console.log(req.body);
    logic.getemail(req.body.email).then((result)=>{
            res.status(result.statusCode).json(result)  
        })
})

// addbooks

server.post('/adminaddbook',(req,res)=>{
    console.log('inside adminaddbook api');
    console.log(req.body);
    logic.addbooks(req.body.booktitle,
        req.body.author,
        req.body.publisher,
        req.body.image,
        req.body.pubdate,
        req.body.countbooks).then((result)=>{
            res.status(result.statusCode).json(result)  
        })
})

// getbooks

server.get('/adminallbooks', (req, res) => {
    console.log('inside adminbooks');
    console.log(req.body);
    logic.getbooks().then((result) => {
        res.status(result.statusCode).json(result.result);
        console.log(result);
    });
});

// delete
server.delete('/delete-book/:booktitle',(req,res)=>{
    logic.deletebook(req.params.booktitle).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})


server.post('/adminaddedone', (req, res) => {
    logic.getUser(req.body.product,req.body.name).then((result) => {
      res.status(result.statusCode).json(result);
    });
  });

  server.get('/adminpageget',(req,res)=>{
    logic.bookDetails().then((result)=>{
        res.status(result.statusCode).json(result);
    })
  })


  server.post('/requestedbook',(req,res)=>{
    console.log('inside the reqsted');
    console.log(req.body);
    logic.requestbooks(req.body.booktitle,
        req.body.author,
        req.body.publisher).then((result)=>{
            res.status(result.statusCode).json(result)
        })
  })

  server.get('/requsetall',(req,res)=>{
    console.log(req.body);
    logic.requestgetbook().then((result)=>{
        res.status(result.statusCode).json(result.result);
    })
})