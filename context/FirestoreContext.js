import React, { useContext, useEffect, useState } from 'react';
import { firebase } from '../helpers/firebase';
import { useAuth } from './AuthContext';
import { firestore } from '../helpers/firebase';

const FirestoreContext = React.createContext();

export function useFirestore() {
	return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
	// --- hooks ---
	const { currentUser } = useAuth();

	// --- collection refs ---
	const messagesRef = firestore.collection('messages');
	const friendsRef = firestore.collection('friends');

	// --- functions ---
	// TODO: Update send message with friend display name or email
	async function sendMessage(message) {
		const { photoURL } = currentUser;
		await messagesRef.add({
			text: message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			email: currentUser.email,
			photoURL,
		});
		return;
	}
	// TODO: Update add user to adding user via display name or email
	// send a friend request
	async function sendFriendRequest(friendEmail) {
		await friendsRef
			.doc(friendEmail)
			.update(
				{
					pending: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
				},
				{ merge: true }
			)
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
		friendsRef,
		acceptFriendRequest,
		declineFriendRequest,
		removeFriend,
	};

	// markup
	return (
		<FirestoreContext.Provider value={value}>
			{children}
		</FirestoreContext.Provider>
	);
}
