import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User, UserCredential } from "firebase/auth";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import type { userDetailsType, AuthContextType } from "./types/type";

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<userDetailsType | null>(null);

  
  async function signUp(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        favorites: [],
        cart: [],
        details: {},
      });
    } catch (err: any) {
      if (err.message.match("email-already-in-use")) {
        throw new Error("Email already in use");
      }
      console.log(err);
      throw err.message;
    }
  }
  function logIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut(): Promise<void> {
    return signOut(auth);
  }
  async function addToUserDetails(data: userDetailsType) {
    if (user?.email) {
      await updateDoc(doc(db, "users", user?.email), {
        details: { ...data },
      });
    } else {
      throw Error();
    }
  }

  useEffect(() => {
    const unsubsicribe = onAuthStateChanged(
      auth,
      (currentUser: User | null) => {
        setUser(currentUser);
      },
    );
    return unsubsicribe;
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    const unsubsicribe = onSnapshot(doc(db, "users", user?.email), (doc) => {
      setUserDetails(doc.data()?.details);
    });
    return unsubsicribe;
  }, [user?.email]);

  function resetAll(): void {
    setUserDetails(null);
  }
  return (
    <AuthContext.Provider
      value={{
        signUp,
        user,
        logIn,
        logOut,
        userDetails,
        addToUserDetails,
        setUser,
        resetAll,
      
        setUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context == null) {
    throw Error("AuthContext must be used within a AuthContextProvider");
  }
  return context;
}
