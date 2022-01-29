import React, {Component} from 'react';
import useFirebase from  '../auths/useFirebase'
import useFirebaseG from  '../auths/useFBgoogle'
import useFirebaseF from '../auths/useFBfacebook'


const Login =() =>{
  const {handleSignInTwitter} = useFirebase();
  const {handleSignInGoogle} = useFirebaseG();
  const {handleSignInFacebook} = useFirebaseF();
  return (
    <div>
    <button onClick = {handleSignInGoogle}> Sign in with Google</button>
    <button onClick = {handleSignInTwitter}> Sign in with Twitter</button>
    <button onClick = {handleSignInFacebook}> Sign in with Facebook</button>
    </div>
  )
}



export default Login;
