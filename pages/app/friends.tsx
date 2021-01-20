import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../context/FirestoreContext';
import formatEmail from '../../helpers/formatEmail';
import { getValueFromRef } from '../../helpers/getValueFromRef';

export default function friends() {
	// --- hooks ---
	const [friends, setFriends] = useState([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [sentRequests, setSentRequests] = useState([]);
	const { currentUser } = useAuth();
	const {
		friendsRef,
		sendFriendRequest,
		acceptFriendRequest,
		declineFriendRequest,
		removeFriend,
	} = useFirestore();
	const newFriendRef = useRef();

	// get friends
	const query: object = friendsRef.doc(currentUser.email);
	const [friendsRes] = useDocument(query);
	console.log(friendsRes?.data());
	useEffect(() => {
		setFriends(friendsRes?.data()?.friends ?? []);
		setPendingRequests(friendsRes?.data()?.pending ?? []);
		setSentRequests(friendsRes?.data()?.sent ?? []);
	}, [friendsRes]);
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
			{sentRequests.length > 0 && (
				<div>
					<h4>Sent</h4>
					{sentRequests.map((friend) => (
						<p key={friend} className='bg-red-200 rounded py-1 px-2'>
							{friend}
						</p>
					))}
				</div>
			)}
			{pendingRequests.length > 0 && (
				<div>
					<h4>Pending</h4>
					{pendingRequests.map((friend) => (
						<p key={friend} className='bg-red-500 rounded py-1 px-2'>
							{friend}
							<button
								onClick={() => acceptFriendRequest(friend)}
								className='bg-gray-100 p-1 rounded'
							>
								Accept
							</button>
							<button
								onClick={() => declineFriendRequest(friend)}
								className='bg-red-100 p-1 rounded'
							>
								Decline
							</button>
						</p>
					))}
				</div>
			)}
			<div>
				<h4>Friends</h4>
				{friends &&
					friends.map((friend) => (
						<p key={friend}>
							{friend}
							<button onClick={() => removeFriend(friend)}>Remove</button>
						</p>
					))}
			</div>
			<form onSubmit={handleSubmit}>
				<input type='text' required ref={newFriendRef} />
			</form>
		</div>
	);
}
