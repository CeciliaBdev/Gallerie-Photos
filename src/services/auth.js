import { getAuth, signInAnonymously, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const login = async () => {
  try {
    const userCredential = await signInAnonymously(auth)
    localStorage.setItem('userToken', userCredential.user.uid)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    localStorage.removeItem('userToken')
  } catch (error) {
    throw error
  }
}
