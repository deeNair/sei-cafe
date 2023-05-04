//an API module that will handle user-related communications with the server:
//src/components/SignUpForm/SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)
/*export async function signUp(userData){
    const BASE_URL = '/api/users';

    //telling fetch api we r sending data , in body we r sending tht data by converting the data object into string and send over to server

    const res =await fetch(BASE_URL,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(userData)
    });// makes the JS object to a string to be send over the internet
    
// check if res was recieved
    if(res.ok){
        //parses string back to json
        return res.json();//jwt token
    }else{
        throw new Error('Invalid sign up!');
    }
}
export async function checkToken(){
    return sendRequest(`${BASE_URL/checkToken}`)
};

export async function login(credentials){
    const BASE_URL = '/api/users';

    //telling fetch api we r sending data , in body we r sending tht data by converting the data object into string and send over to server

    const res =await fetch(`${BASE_URL}/login`,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(credentials)
    });// makes the JS object to a string to be send over the internet
    
// check if res was recieved
    if(res.ok){
        //parses string back to json
        return res.json();//jwt token
    }else{
        throw new Error('Invalid LOGIN!');
    }
}*/

// The users-service.js module will definitely need to make AJAX requests to the Express server.

import { getToken } from "./users-service";

//* SignUpForm.jsx <--> users-service.js <--> users-api.js <-Internet-> server.js (Express)

//* handleSubmit <--> [signUp]-users-service <--> [signUp]-users-api <-Internet-> server.js (Express)


const BASE_URL = '/api/users';

//* SignUp
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}


//* Login
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

//* Check Token
export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
} 

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
//sends token to backend
  const token = getToken();

  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}