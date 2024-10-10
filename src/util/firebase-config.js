import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBipHOgK67hmDvSIbk8NPTJ0I0RFQIfFyc",
  authDomain: "vibenest-e868b.firebaseapp.com",
  projectId: "vibenest-e868b",
  storageBucket: "vibenest-e868b.appspot.com",
  messagingSenderId: "665090978373",
  appId: "1:665090978373:web:d0a16e183ca589b9c9e92c",
  measurementId: "G-PJVR7PTD7G"
};
const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig