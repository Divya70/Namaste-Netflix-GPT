import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUSer } from "../utils/userSlice";
import { BG_URL, PROFILE_URL } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Signup Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PROFILE_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUSer({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_URL} alt="bg-image" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute bg-black w-3/12 mx-auto p-12 right-0 left-0 my-36 text-white rounded-md bg-opacity-80"
      >
        <h1 className="font-bold text-3xl mb-7 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
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
        <p style={{ color: "red" }}>{errorMessage} </p>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="px-4 py-3 w-full bg-gray-900 bg-opacity-15 border border-b-2 border-gray-400 mb-4"
        />
        <p style={{ color: "red" }}>{errorMessage} </p>
        {!isSignInForm && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 w-full bg-gray-900 bg-opacity-15 border border-b-2 border-gray-400"
          />
        )}
        <button
          className="px-4 py-2 mt-4 bg-red-700 w-full rounded-sm cursor-pointer font-bold text-base"
          type="submit"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex gap-2 py-4" onClick={handleSignIn}>
          {isSignInForm ? (
            <>
              <p className="text-gray-400">New to Netflix?</p>
              <span className="font-semibold text-base ">Sign up now</span>
            </>
          ) : (
            <>
              <p className="text-gray-400">Already Sign Up?</p>
              <span className="font-semibold text-base ">Sign In now</span>
            </>
          )}
        </div>
        <span className="text-xs text-slate-400">
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot.
          <span className="text-blue-600 ml-1 font-semibold">Learn more.</span>
        </span>
      </form>
    </div>
  );
};
export default Login;
