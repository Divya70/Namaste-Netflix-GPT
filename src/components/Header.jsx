import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUSer, removeUSer } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constant";
const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log("Error:", error);
        navigate("/error");
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUSer({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUSer());
        navigate("/");
      }
    });
    // Unscuscribe when my components will unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black font-extrabold z-10 flex justify-between">
      <img className="w-44 " src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-10 h-10" src={user?.photoURL} alt="userIcon" />
          <div className="font-bold text-white" onClick={handleSignout}>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
