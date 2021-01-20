import { Input } from 'postcss';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../context/FirestoreContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getValueFromRef } from '../../helpers/getValueFromRef';

interface I_Message {
	text: string;
	uid: string;
}

export default function chat() {
	// --- hooks ---
	const [error, setError] = useState('');
	const { sendMessage, messagesRef } = useFirestore();
	const chatMessageRef = useRef();

	// --- query ---
	// query setup
	const query = messagesRef.orderBy('createdAt').limit(25);
	// get messages
	const [messages] = useCollectionData(query);

	// --- chat ---
	// send message on submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const message: String = getValueFromRef(chatMessageRef);

		try {
			await sendMessage(message);
		} catch (err) {
			console.error(err);
			setError('Could not send message');
		}
	};

	// markup
	return (
		<>
			{error && <p>{error}</p>}
			{messages?.map((msg: I_Message, idx) => (
				<Message key={msg?.uid ?? idx} message={msg} />
			))}
			<form onSubmit={handleSubmit}>
				<input type='text' required ref={chatMessageRef} />
			</form>
		</>
	);
}

function Message({ message }) {
	const { text, uid } = message;
	const { currentUser } = useAuth();
	const messageClass = uid === currentUser.uid ? 'sent' : 'received';

	return (
		<div className={messageClass}>
			<p>{text}</p>
		</div>
	);
}
