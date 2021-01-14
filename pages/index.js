import Head from 'next/head';
import Link from 'next/link';

// --- page ---
export default function Home() {
	// --- markup ---
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<nav className='flex flex-col text-center'>
				<Link href='/app'>
					<a>Dashboard</a>
				</Link>
				<Link href='/signup'>
					<a>Sign Up</a>
				</Link>
				<Link href='/login'>
					<a>Log in</a>
				</Link>
			</nav>
		</div>
	);
}
