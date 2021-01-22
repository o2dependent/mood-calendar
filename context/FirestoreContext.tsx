import React, { useContext, useEffect, useState } from 'react';
import { firebase } from '../helpers/firebase';
import { useAuth } from './AuthContext';
import { firestore } from '../helpers/firebase';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

const FirestoreContext = React.createContext(null);

export function useFirestore() {
	return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
	// --- hooks ---
	const { currentUser } = useAuth();
	const [friends, setFriends] = useState([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [sentRequests, setSentRequests] = useState([]);

	// --- collection refs ---
	const messagesRef = firestore.collection('messages');
	const friendsRef = firestore.collection('friends');

	// get friends
	const query: object = friendsRef.doc(currentUser.email);
	const [friendsRes] = useDocument(query);
	useEffect(() => {
		setFriends(friendsRes?.data()?.friends ?? []);
		setPendingRequests(friendsRes?.data()?.pending ?? []);
		setSentRequests(friendsRes?.data()?.sent ?? []);
	}, [friendsRes]);

	// --- functions ---
	// TODO: Update send message with friend display name or email
	async function sendMessage(text, docName) {
		const message = {
			text: text,
			email: currentUser.email,
			createdAt: new Date(),
		};
		try {
			await messagesRef.doc(docName).update({
				messages: firebase.firestore.FieldValue.arrayUnion(message),
			});
			return;
		} catch (err) {
			console.error(err);
			try {
				await messagesRef.doc(docName).set({
					messages: firebase.firestore.FieldValue.arrayUnion(message),
				});
				return;
			} catch (err) {
				console.error(err);
			}
		}
	}
	// TODO: Update add user to adding user via display name or email
	// send a friend request
	async function sendFriendRequest(friendEmail) {
		await friendsRef
			.doc(friendEmail)
			.update({
				pending: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
			})
			.then(
				async () =>
					await friendsRef
						.doc(currentUser.email)
						.set(
							{
								sent: firebase.firestore.FieldValue.arrayUnion(friendEmail),
							},
							{ merge: true }
						)
						.then(() => console.log('SUCCESS: request sent'))
						.catch(() => console.log('failed to update your sent requests'))
			)
			.catch((e) => console.log('user does not exist'));
		return;
	}
	// accept friend request
	async function acceptFriendRequest(friendEmail) {
		try {
			await friendsRef.doc(friendEmail).update({
				friends: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
				sent: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
			});
			await friendsRef.doc(currentUser.email).update({
				friends: firebase.firestore.FieldValue.arrayUnion(friendEmail),
				pending: firebase.firestore.FieldValue.arrayRemove(friendEmail),
			});
		} catch (err) {
			console.error(err);
		}
	}
	// decline friend request
	async function declineFriendRequest(friendEmail) {
		try {
			await friendsRef.doc(friendEmail).update({
				sent: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
			});
			await friendsRef.doc(currentUser.email).update({
				pending: firebase.firestore.FieldValue.arrayRemove(friendEmail),
			});
		} catch (err) {
			console.error(err);
		}
	}
	// remove friend
	async function removeFriend(friendEmail) {
		try {
			await friendsRef.doc(friendEmail).update({
				friends: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
			});
			await friendsRef.doc(currentUser.email).update({
				friends: firebase.firestore.FieldValue.arrayRemove(friendEmail),
			});
		} catch (err) {
			console.error(err);
		}
	}
	// --- value for context ---
	const value = {
		sendMessage,
		sendFriendRequest,
		messagesRef,
		acceptFriendRequest,
		declineFriendRequest,
		removeFriend,
		friends,
		pendingRequests,
		sentRequests,
	};

	// markup
	return (
		<FirestoreContext.Provider value={value}>
			{children}
		</FirestoreContext.Provider>
	);
}
