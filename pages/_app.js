import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { FirestoreProvider } from '../context/FirestoreContext';
import { DarkModeProvider } from '../context/DarkModeContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/app/AppLayout';
import WithAuth from '../components/middleware/withAuth';

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<AuthProvider>
			<DarkModeProvider>
				<Head>
					<link rel='preconnect' href='https://fonts.gstatic.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Poppins:wght@300;400;500&display=swap'
						rel='stylesheet'
					/>
				</Head>
				{router.pathname.startsWith('/app') ? (
					<FirestoreProvider>
						<WithAuth>
							<AppLayout>
								<Component {...pageProps} />
							</AppLayout>
						</WithAuth>
					</FirestoreProvider>
				) : (
					<Component {...pageProps} />
				)}
			</DarkModeProvider>
		</AuthProvider>
	);
}

export default MyApp;
