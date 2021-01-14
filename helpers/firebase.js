import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

if (!firebase.apps.length) {
	firebase.initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);
}

const app = firebase.app();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
export default app;
