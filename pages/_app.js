import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { FirestoreProvider } from '../context/FirestoreContext';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<FirestoreProvider>
				<Component {...pageProps} />
			</FirestoreProvider>
		</AuthProvider>
	);
}

export default MyApp;
