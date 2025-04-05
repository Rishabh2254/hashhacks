import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// User roles
export type UserRole = 'patient' | 'doctor' | 'admin';

// User data with optional patient specific fields
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string;
  role: UserRole;
  gender?: string;  // Optional field for patient
  phoneNumber?: string;  // Optional field for patient
  hospitalId?: string;   // Optional for admin
}

// Register new user
export const registerUser = async (
  email: string, 
  password: string, 
  displayName: string,
  role: UserRole = 'patient',
  additionalData: Record<string, any> = {}
): Promise<UserData> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

// Update profile with display name
await updateProfile(user, { displayName });

// Base userData
const userData: UserData = {
      uid: user.uid,
      email: user.email || email,
      displayName,
      role,
      ...additionalData
    };

    // For Admin, generate hospital ID and append
    if (role === 'admin') {
      const serial = Math.floor(1000 + Math.random() * 9000);
      const pincode = additionalData.pincode || '000000';
      const hospitalId = `${serial}-${pincode}`;
      userData.hospitalId = hospitalId;
    }

    await setDoc(doc(db, "users", user.uid), userData);

    return userData;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (email: string, password: string, role: UserRole = "patient") => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Verify user role
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      if (userData.role !== role) {
        await firebaseSignOut(auth);
        throw new Error(`You don't have ${role} access. Please sign in with the correct account type.`);
      }
    }

    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get current user data including role
export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = auth.currentUser;

  if (!user) {
    return null;
  }

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};
