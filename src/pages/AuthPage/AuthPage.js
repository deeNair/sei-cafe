//import React from 'react';
import SignUpForm from '../../components/SignUpForm';
//import SignUpForm from '../components/SignUpform';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './AuthPage.module.css';
import Logo from '../../components/Logo/Logo';

import { useState } from "react";

function AuthPage(props)  {
  const {setUser}=props;
  const[showLogin,setShowLogin]=useState(true);


    return (
      <main className={styles.AuthPage}>
       
        <Logo />
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Sign up" : "Sign in"}
        </h3>
  
        {showLogin ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </main>
    );

}

export default AuthPage;