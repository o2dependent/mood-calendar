import Link from 'next/link';
import React, { useRef } from 'react';
import { useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';

export default function Friends({ closeMenu }) {
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
	// --- markup ---
	return (
		<div>
			{pendingRequests.length > 0 && (
				<div>
					<h4>Pending</h4>
					{pendingRequests.map((friend) => (
						<div
							key={friend}
							className='bg-gray-200 grid grid-cols-2 grid-rows-2 gap-x-2 rounded h-24 w-full p-2'
						>
							<p className='text-md w-full text-lg col-span-2'>{friend}</p>
							<button
								onClick={() => declineFriendRequest(friend)}
								className='bg-gray-50 font-medium text-gray-700 p-1 w-full h-10 rounded'
							>
								Decline
							</button>
							<button
								onClick={() => acceptFriendRequest(friend)}
								className='bg-red-500 text-white font-medium p-1 w-full h-10 rounded'
							>
								Accept
							</button>
						</div>
					))}
				</div>
			)}
			{sentRequests.length > 0 && (
				<div>
					<h4>Sent</h4>
					{sentRequests.map((friend) => (
						<div
							key={friend}
							className='flex items-center bg-gray-200 h-10 w-full p-2'
						>
							<p className='text-base'>{friend}</p>
						</div>
					))}
				</div>
			)}

			<div>
				<h4>Friends</h4>
				{friends &&
					friends.map((friend) => (
						<Link href={`/app/m/${friend}`}>
							<a
								onClick={closeMenu}
								key={friend}
								className='flex items-center rounded bg-gray-200 h-14 w-full p-2'
							>
								<p className='h-'>{friend}</p>
								{/* <button onClick={() => removeFriend(friend)}>Remove</button> */}
							</a>
						</Link>
					))}
			</div>
			<form onSubmit={handleSubmit}>
				<input type='text' required ref={newFriendRef} />
			</form>
		</div>
	);
}
