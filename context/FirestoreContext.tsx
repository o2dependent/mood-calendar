import React, { useContext, useEffect, useState } from 'react';
import { firebase } from '../helpers/firebase';
import { useAuth } from './AuthContext';
import { firestore } from '../helpers/firebase';
import {
	useCollection,
	useCollectionData,
	useDocument,
	useDocumentData,
	useDocumentOnce,
} from 'react-firebase-hooks/firestore';

// TODO: when editing the friends list schema change this to maintain strong typing
export type I_User = string;
interface I_FriendRes {
	friends: I_User[];
	pending: I_User[];
	sent: I_User[];
}

const FirestoreContext = React.createContext(null);

export function useFirestore() {
	return useContext(FirestoreContext);
}

export function FirestoreProvider({ children }) {
	// --- hooks ---
	const { currentUser } = useAuth();
	const [friends, setFriends] = useState<I_User[]>([]);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [sentRequests, setSentRequests] = useState([]);
	const [lists, setLists] = useState([]);

	// --- collection refs ---
	const messagesRef = firestore.collection('messages');
	const friendsRef = firestore.collection('friends');
	const listsDisplayRef = firestore.collection('lists_display');
	const listsRef = firestore.collection('lists');
	const todosRef = firestore.collection('todos');

	// get friends
	const friendsQuery = friendsRef.doc(currentUser.email);
	const [friendsRes] = useDocumentData<I_FriendRes>(friendsQuery);
	useEffect(() => {
		setFriends(friendsRes?.friends ?? []);
		setPendingRequests(friendsRes?.pending ?? []);
		setSentRequests(friendsRes?.sent ?? []);
	}, [friendsRes]);

	// get user's lists TODO: migrate to cleaner user implementations to reduce document calls
	const listsDisplayQuery = listsDisplayRef.where(
		'users',
		'array-contains',
		currentUser.email
	);
	const [listsRes] = useCollection(listsDisplayQuery);

	useEffect(() => {
		const newLists = listsRes?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
		}));
		setLists(newLists);
	}, [listsRes]);

	// --- functions ---
	// TODO: Update send message with friend display name or email
	async function sendMessage(text: string, docName: string) {
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
	async function sendFriendRequest(friendEmail: string) {
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
	async function acceptFriendRequest(friendEmail: string) {
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
	async function declineFriendRequest(friendEmail: string) {
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
	async function removeFriend(friendEmail: string) {
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
	// add new list
	async function addNewList(title: string) {
		try {
			await listsDisplayRef.add({
				title,
				users: [currentUser.email],
				sections: [],
			});
		} catch (err) {
			console.error(err);
		}
	}
	// toggle todos completed
	async function toggleTodoCompleted(
		listId: string,
		todoId: string,
		todoCurState: boolean
	) {
		try {
			await listsDisplayRef
				.doc(listId)
				.collection('todos')
				.doc(todoId)
				.update({ completed: !todoCurState });
		} catch (err) {
			console.error(err);
		}
	}
	// create todo
	async function addNewTodo(listId: string, text: string, section: string) {
		try {
			await listsDisplayRef.doc(listId).collection('todos').add({
				text,
				section,
				completed: false,
			});
		} catch (err) {
			console.error(err);
		}
	}
	// delete todo
	async function deleteTodo(listId: string, todoId: string) {
		try {
			await listsDisplayRef
				.doc(listId)
				.collection('todos')
				.doc(todoId)
				.delete();
		} catch (err) {
			console.error(err);
		}
	}
	// add new section to list
	async function addNewSection(listId: string, section: string) {
		try {
			await listsDisplayRef.doc(listId).update({
				sections: firebase.firestore.FieldValue.arrayUnion(section),
			});
		} catch (err) {
			console.error(err);
		}
	}
	// delte section
	async function deleteSection(listId: string, section: string) {
		try {
			await listsDisplayRef.doc(listId).update({
				sections: firebase.firestore.FieldValue.arrayRemove(section),
			});
		} catch (err) {
			console.error(err);
		}
	}
	// --- value for context ---
	const value = {
		messagesRef,
		listsRef,
		todosRef,
		sendMessage,
		sendFriendRequest,
		acceptFriendRequest,
		declineFriendRequest,
		removeFriend,
		toggleTodoCompleted,
		deleteTodo,
		addNewTodo,
		addNewSection,
		addNewList,
		deleteSection,
		friends,
		pendingRequests,
		sentRequests,
		lists,
		listsDisplayRef,
	};

	// markup
	return (
		<FirestoreContext.Provider value={value}>
			{children}
		</FirestoreContext.Provider>
	);
}
