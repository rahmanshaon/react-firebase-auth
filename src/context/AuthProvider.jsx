import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // State to hold the user and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to create a new user
  const createUser = (email, password) => {
    setLoading(true);
    console.log(`Attempting to create user with email: ${email}`);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to update user's profile (name and photo)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setUser({ ...auth.currentUser });
    });
  };

  // Function to sign in with email and password
  const signIn = (email, password) => {
    setLoading(true);
    console.log(`Attempting to sign in with email: ${email}`);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to sign in with Google
  const googleSignIn = () => {
    setLoading(true);
    console.log("Attempting Google sign in.");
    return signInWithPopup(auth, googleProvider);
  };

  // Function for password reset
  const resetPassword = (email) => {
    setLoading(true);
    console.log(`Sending password reset email to: ${email}`);
    return sendPasswordResetEmail(auth, email);
  };

  // LOGOUT FUNCTION
  const logOut = () => {
    setLoading(true); // Set loading to true when logging out
    console.log("Attempting to log out.");
    return signOut(auth);
  };

  // Observer watches for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("on auth state changed observed user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      console.log("cleaning up auth observer");
      unsubscribe();
    };
  }, []);

  // value provide by the context
  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    googleSignIn,
    resetPassword,
    logOut,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
