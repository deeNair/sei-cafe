import { useState } from "react";
import {signUp} from '../utilities/users-service';

function SignUpForm({setUser}){
    //state is coming from form data,usestate contains all form data
    const [formData,setFormData]= useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
        error: "",
    })
const disable = formData.password !== formData.confirm; //return true or false,can do for email

const handleSubmit =async (e)=>{
    e.preventDefault(); //prevent refresh
  
    try{
        console.log(formData);
        //new object tht doesn't contatin error and confirm which u dont need in backend.
        //data to b sent to backend to create new user.
        const userData ={
            name:formData.name,
            email:formData.email,
            password:formData.password
        }
        //return a token with user info
        const user = await signUp(userData);
        console.log(user);
        setUser(user);
        
    }catch(error){
       setFormData({...formData, error: "sign up failed -try again"})
    }
};


const handleChange=(evt)=>{
    //update the state thts entered in the form 
    //evt.value is what user types,evt name is email,name etc.
    setFormData({...formData,[evt.target.name]:evt.target.value,error:''})
}
    return(
        <div><div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required/>

                <label>Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} required/>
                
                <label>password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                
                <label>Confirm</label>
                <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required/>

                <button type="submit" disabled={disable}> SIGN UP</button>
            </form>
            </div>
            <p className="error-message">{formData.error}</p>
        </div>
    )
}

export default SignUpForm;