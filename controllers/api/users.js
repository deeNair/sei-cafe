const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// req handler logic in a seprate file .callback funct
/*function create(req,res){
//console.log('[from Post handler]',req.body)
  res.json({
    user:{
        name:req.body.name,
        email:req.body.email
    }
  })
}

//console.log(`[from post handler], ${req.body}`);*/
function createJWT(user){
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
  
  }
  

async function create(req,res){
     // console.log('[From POST handler]', req.body)
   try{
    // create new user ,to Add to db
    const user = await User.create(req.body);
    console.log(user);
    // token will be a string
    //call the jwt function
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
    //create a new jwt
   // jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});

   }catch(error){
    // Client will check for non-2xx status code
    // 400 = Bad Request
    console.log(error);
    res.status(400).json(error)
   }
}



async function login(req, res) {
  try {
      // find user in db
    const user = await User.findOne({ email: req.body.email });
    // check if we found an user
    if (!user) throw new Error();
    // compare the password to hashed password
    const match = await bcrypt.compare(req.body.password, user.password);
    // check is password matched
    if (!match) throw new Error();
    // send back a new token with the user data in the payload
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function checkToken(req,res){
  console.log(req.user);
 // console.log(req.exp);
  res.json(req.exp);
}

module.exports = {
create,login,checkToken
}


/*async function login(req,res){
  // console.log('[From POST handler]', req.body)
try{
 // create new user ,to Add to db,findone doc filter by email,
 const user = await User.findOne({email:req.body.email});
 console.log('[user found]',user);
 if(!user){
  throw Error('ser not found!');
  //res.json({msg:"user not found"})
 }
 //if user exists compare
 const matched = await bcrypt.compare(req.body.password,user.password)
 //if no match
 if(!matched){
  throw Error('user not found!');
 }
const token = createJWT(user);
res.json(token);

 
}catch(error){
 
 console.log(error);
 res.status(400).json({error:"check credentials"})
}
}

// controllers/api/users.js

// Be Sure to add the following
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login
};
*/