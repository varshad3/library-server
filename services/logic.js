// logic for register
const db=require('./db')
const jwt= require('jsonwebtoken')

const register=(username,email,password,repassword)=>{
console.log('inside register logic');

return db.User.findOne({
    email
}).then((response)=>{
console.log(response);
if(response){
    return{
        statusCode:401,
        message:"account already exist..."
    }
}
else{
    const newUser = new db.User({
        username,
        email,
        password,
        repassword
    })
    newUser.save()
    return{
        statusCode:200,
        message:"Registered successfully..."
    }
}
})

}

// login logic 
const login=(username,password)=>{
    console.log('inside login logic');
  return db.User.findOne({
        username,
        password
    }).then((result)=>{
        if(result){

            const token= jwt.sign({
                loginUsername:username
            },'secretkey123')
            return{
                statusCode:200,
                message:'login Successfully',
                currentUser:result.username,
                token,
                currentEmail:result.email
            }
        }
        else{
            return{
                statusCode:401,
                message:'invalid account number / password'
            }
        }
    })
}

// adminlogin logic 
const adminlogin=(username,password)=>{
    console.log('inside adminlogin logic');
  return db.User.findOne({
        username,
        password
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:'adminlogin Successfully'
            }
        }
        else{
            return{
                statusCode:401,
                message:'invalid account number / password'
            }
        }
    })
}

const getemail=(email)=>{
    console.log('inside getemil');
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                email:result.email
            } 
        }
        else{
            return{
                statusCode:401,
                message:'invalid email number'
            }
        }
    })
}

const addbooks=(booktitle,
    author,
    publisher,
    image,
    pubdate,
    countbooks)=>{
    console.log('inside addbooks logic');
    
    return db.Getbooks.findOne({
        booktitle
    }).then((response)=>{
    console.log(response);
    if(response){
        return{
            statusCode:401,
            message:"book already exist..."
        }
    }
    else{
        const newGetbooks = new db.Getbooks({
            booktitle,
            author,
            publisher,
            image,
            pubdate,
            countbooks
        })
        newGetbooks.save()
        return{
            statusCode:200,
            message:"books added successfully !!! in the library"
        }
    }
    })
    
    }

    const getbooks = () => {
        return db.Getbooks.find().then((result) => {
          console.log(result);
          if (result) {
            return {
              statusCode: 200,
              result: result
            };
          } else {
            return {
              statusCode: 404,
              message: "No books found.",
            };
          }
        });
      };

      const deletebook=(booktitle)=>{
        return db.Getbooks.deleteOne({
            booktitle
        }).then((result)=>{
            if(result){
                return db.Getbooks.find().then((result)=>{
                    if(result){
                        return{
                            statusCode:200,
                            books:result
                        }
                    }
                    else{
                        return {
                            statusCode:404,
                            message:'book is empty'
                        }
                    }
                })
                    
                
            }
            else{
                return{
                    statusCode:404,
                    message:'item not found'
                }
            }
        })
    }

    const getUser=(product,name)=>{
        return db.IssuedBooks.findOne({
            booktitle:product.booktitle
        }).then((result)=>{
            if(result){
        return{
            statusCode:200,
            message:'already exist'
        };
    }
    else{
       let newproduct=db.IssuedBooks({
        booktitle:product.booktitle,
        author:product.author,
        name:name,
        pubdate:product.pubdate
       })
       newproduct.save()
       return{
        statusCode:200,
        message:'item added'
       }
    }
})
};   
const bookDetails=()=>{
    return db.IssuedBooks.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                bookitems:result
            }
        }
        else{
            return{
                statusCode:401,
                message:"empty"
            }
        }
    })
}

const requestbooks=(booktitle,author,publisher)=>{
    console.log('inside the request book api');
    return db.Requestbooks.findOne({
        booktitle
    }).then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:401,
                message:"requested book already exist..."
            }
        }
        else{
            const newRequestbook = new db.Requestbooks({
                booktitle,author,publisher
            })
            newRequestbook.save()
            return{
                statusCode:200,
                message:"Accepted the Request"
            }
        }
    })
}

const requestgetbook=()=>{
    return db.Requestbooks.find({
        
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                result:result
            }
        }
        else{
            return{
                statusCode:401,
                message:"no request found"
            };
        }
    });
};

module.exports={
    register,
    login,
    adminlogin,
    getemail,
    addbooks,
    getbooks,
    deletebook,
    getUser,
    bookDetails,
    requestbooks,
    requestgetbook
}