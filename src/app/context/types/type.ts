import type { User, UserCredential } from "firebase/auth";


export interface userDetailsType {
  firstName: string;
  lastName: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthContextType {
  user: User | null;
  setUserDetails: React.Dispatch<React.SetStateAction<userDetailsType | null>>;
  resetAll: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userDetails: userDetailsType | null;
  addToUserDetails: (data: userDetailsType) => void;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}
