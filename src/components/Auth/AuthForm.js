import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false)

  const emailInputRef = useRef("")
  const passwordInputRef = useRef("")

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
     event.preventDefault();
     const enterdEmail = emailInputRef.current.value
     const enterdPassword = passwordInputRef.current.value

     setIsLoading(true)
     if(isLogin){

     }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGXdchh1o8k8uG-_1w2V4zlbbgktEl1bo',
      {
        method:'POST',
        body:JSON.stringify({
          email:enterdEmail,
          password:enterdPassword,
          returnSecureToken:true,
        }),
        headers:{
          'Content-Type':'application/json'
        },
      }
      ).then((res)=>{
        setIsLoading(false)
        if(res.ok){

        }else{
          return res.json().then((data)=>{
            let errorMessage = 'Authentication Failed!';
            // if(data && data.error && data.error.message) {
            //   errorMessage = data.error.message
            // }
            alert(errorMessage)
           
          }) 
        }
      })
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login":"Create account"}</button>}
          {isLoading && <p style={{color:"white"}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
