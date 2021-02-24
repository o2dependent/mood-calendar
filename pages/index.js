import Head from 'next/head';
import Link from 'next/link';
import HomeNav from '../components/layout/home/HomeNav';
import { useAuth } from '../context/AuthContext';

// --- page ---
export default function Home() {
	// --- markup ---
	return (
		<div className='flex flex-col h-full'>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<HomeNav />
			<div className='container flex flex-col justify-center align-center mx-auto min-h-100 flex-grow pb-24'>
				<h1 className='mx-auto md:w-9/12 w-full text-center font-light leading-tight text-5xl'>
					<span className='box-accent'>Plan</span> better with your friends.
				</h1>
				<p className='mx-auto md:w-7/12 w-9/12 text-center mt-10'>
					Keep your plans synced with your friends and family.
				</p>
				<div className='mt-10 max-w-lg mx-auto'>
					<NavLink lg isAction href='/signup'>
						Try it now for free!
					</NavLink>
				</div>
			</div>
		</div>
	);
}

const NavLink = ({ href, children, isAction, lg }) => {
	return (
		<div
			className={`min-w-24 mx-3 text-xl flex justify-center align-center ${
				isAction ? 'bg-red-500 rounded text-white' : ''
			} ${lg ? 'text-2xl' : ''}`}
		>
			<Link href={href}>
				<a className={`w-100 h-100 ${lg ? 'px-4 py-3' : 'p-2'}`}>{children}</a>
			</Link>
		</div>
	);
};
