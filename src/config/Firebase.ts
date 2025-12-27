import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAP-aEm1wWnQ3DUpoXZtIpO4L4R__749j8",
    authDomain: "emenu-6d977.firebaseapp.com",
    projectId: "emenu-6d977",
    storageBucket: "emenu-6d977.firebasestorage.app",
    messagingSenderId: "776373284433",
    appId: "1:776373284433:web:e83636dfb1c3b080371270",
    measurementId: "G-3J7GHN0Q65"
};

// export default function Firebase() {
const app = initializeApp(firebaseConfig);
// return app;
// }
export const auth = getAuth(app);

