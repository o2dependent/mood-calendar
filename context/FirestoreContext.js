import React, { useContext, useEffect, useState } from 'react';
import { firestore, firebase } from '../helpers/firebase';
import { useAuth } from './AuthContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const FirestoreContext = React.createContext();

export function useFirestore() {
	return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);
	const [messages] = useCollectionData(query);

	const { currentUser } = useAuth();

	async function sendMessage(message) {
		const { uid, photoURL } = currentUser;
		await messagesRef.add({
			text: message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		return;
	}

	const value = { messages, sendMessage };

	return (
		<FirestoreContext.Provider value={value}>
			{children}
		</FirestoreContext.Provider>
	);
}
