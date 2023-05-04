//We will use a src/utilities/users-service.js module to organize functions used to sign-up, log in, log out, etc.

//src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
import * as usersApi from './users-api';
//import {getToken} from 

//get token
export function getToken(){
    const token = localStorage.getItem('token');
    //if no token
    if(!token) return null;

    //gets payload string, get encoded data
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);

    //if token expired
    if(payload.exp < Date.now()/ 1000){
        localStorage.removeItem('token');
        return null;
    }

    //if token is valid
    return token;
}


//Get User
export function getUser(){
    //cxall above func get token
 const token=getToken();
 //return user info in token else null
return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}



export async function signUp(userData){


    //use the signup api form
    console.log('[From signup function]',userData)
    //passes data from signup form to users api , and awaits return coz its making http req, recieves token back from usersapi 
    const token = await usersApi.signUp(userData);
    localStorage.setItem('token',token);
    //return token;
    return getUser();
}

//logout
export function logOut() {
    localStorage.removeItem('token')
}
//login
export async function login(credentials){
    const token = await usersApi.login(credentials);
    localStorage.setItem('token',token);
   // return token;
   return getUser();

}

export async function checkToken(){
    //console.log('checkToken');
    return usersApi.checkToken().then(dateStr=> new Date(dateStr));

}