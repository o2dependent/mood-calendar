import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useFirestore } from '../../../../context/FirestoreContext';
import { getValueFromRef } from '../../../../helpers/getValueFromRef';

export default function Friends({}) {
	// --- hooks ---
	const {
		sendFriendRequest,
		acceptFriendRequest,
		declineFriendRequest,
		removeFriend,
		friends,
		pendingRequests,
		sentRequests,
	} = useFirestore();
	const newFriendRef = useRef();

	// handle adding new friend
	const handleSubmit = async (e) => {
		e.preventDefault();

		const friendEmail = getValueFromRef(newFriendRef);

		try {
			await sendFriendRequest(friendEmail);
			// TODO: set success message
		} catch (err) {
			console.error(err);
			// TODO: set error message
		}
	};
	// --- framer motion variants ---
	const friendVariant = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
	};
	// --- markup ---
	return (
		<div className=''>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Add friend by email'
					required
					ref={newFriendRef}
				/>
			</form>
			{pendingRequests.length > 0 && (
				<div>
					<h4>Pending</h4>
					<div className='flex flex-col gap-4'>
						{pendingRequests.map((friend) => (
							<motion.div
								variants={friendVariant}
								initial='initial'
								animate='animate'
								exit='initial'
								key={friend.email}
								className='bg-gray-200 grid grid-cols-2 grid-rows-2 gap-x-2 dark:bg-gray-800 rounded h-24 w-full p-2 border border-white border-opacity-10 hover:bg-gray-300 dark:hover:bg-gray-900'
							>
								<p className='text-md w-full text-lg col-span-2'>
									{friend.displayName}
								</p>
								<button
									onClick={() => declineFriendRequest(friend)}
									className='bg-gray-50  dark:bg-gray-700 dark:text-gray-400 font-medium text-gray-700 p-1 w-full h-10 rounded'
								>
									Decline
								</button>
								<button
									onClick={() => acceptFriendRequest(friend)}
									className='bg-red-500 text-white font-medium p-1 w-full h-10 rounded'
								>
									Accept
								</button>
							</motion.div>
						))}
					</div>
				</div>
			)}
			<div>
				<h4>Friends</h4>
				<div className='flex flex-col gap-4'>
					{friends &&
						friends.map((friend) => (
							<Link href={`/app/m/${friend.email}`}>
								<a
									key={friend.email}
									className='flex items-center dark:bg-gray-800 bg-gray-200 h-12 w-full p-2 rounded border border-white border-opacity-10 hover:bg-gray-300 dark:hover:bg-gray-900'
								>
									<p className=''>{friend.displayName}</p>
									{/* <button onClick={() => removeFriend(friend.email)}>Remove</button> */}
								</a>
							</Link>
						))}
				</div>
			</div>
			{sentRequests.length > 0 && (
				<div>
					<h4>Sent</h4>
					<div className='flex flex-col gap-4'>
						{sentRequests.map((friend) => (
							<div
								key={friend.email}
								className='flex items-center dark:bg-gray-800 bg-gray-200 h-10 w-full p-2 rounded border border-white border-opacity-25 opacity-50'
							>
								<p className='text-base'>{friend.split('@')[0]}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
