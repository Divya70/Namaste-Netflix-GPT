import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";

const Login = () => {
  const [isSignInForm , setIsSignInForm] =useState(true)
  const [errorMessage ,setErrorMessage]= useState(null)
  const handleSignIn =()=>{
    setIsSignInForm(!isSignInForm)
  }
  
  const email = useRef(null)
  const password = useRef(null)
  const handleSubmit =(e)=>{
    e.preventDefault()
    const emailMessage = checkValidData(email.current.value)
    const passwordMessage = checkValidData( password.current.value)
    setErrorMessage(emailMessage ,passwordMessage )
console.log(emailMessage,passwordMessage);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg-image"
        />
      </div>
      <form onSubmit={handleSubmit} className="absolute bg-black w-3/12 mx-auto p-12 right-0 left-0 my-36 text-white rounded-md bg-opacity-80">
        <h1 className="font-bold text-3xl mb-7 ">{isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm &&(
          <input
          type="text"
          placeholder="Full Name"
          className="px-4 py-3 mb-4 w-full border border-b-2 border-gray-400 bg-gray-900 bg-opacity-15"
        />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email"
          className="px-4 py-3 mb-4 w-full border border-b-2 border-gray-400 bg-gray-900 bg-opacity-15"
        />
        <p style={{color:"red"}}>{errorMessage} </p>
        <input
        ref={password}
          type="password"
          placeholder="Password"
          className="px-4 py-3 w-full bg-gray-900 bg-opacity-15 border border-b-2 border-gray-400 mb-4"
        />
        <p style={{color:"red"}}>{errorMessage} </p>
        {!isSignInForm && (
           <input
           type="password"
           placeholder="Confirm Password"
           className="px-4 py-3 w-full bg-gray-900 bg-opacity-15 border border-b-2 border-gray-400"
         />
        )}
        <button className="px-4 py-2 mt-4 bg-red-700 w-full rounded-sm cursor-pointer font-bold text-base" type="submit">
          {isSignInForm?"Sign In":"Sign Up"}
        </button>
        <div className="flex gap-2 py-4" onClick={handleSignIn}>
          {isSignInForm ?
          <>
             <p className="text-gray-400">New to Netflix?</p>
          <span className="font-semibold text-base ">Sign up now</span>
          </>
       : <>
       <p className="text-gray-400">Already Sign Up?</p>
    <span className="font-semibold text-base ">Sign In now</span>
    </>
    }
          
        </div>
        <span className="text-xs text-slate-400">
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.
          <span className="text-blue-600 ml-1 font-semibold">Learn more.</span>
        </span>
      </form>
    </div>
  );
};

export default Login;
