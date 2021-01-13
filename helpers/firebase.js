import firebase from 'firebase/app';
import 'firebase/auth';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

if (!firebase.apps.length) {
	firebase.initializeApp(publicRuntimeConfig.FIREBASE_CONFIG);
}

const app = firebase.app();
const auth = firebase.auth();

export { auth };
export default app;
