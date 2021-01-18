import React, { useRef, useState } from 'react';
import AppLayout from '../../components/layout/app/AppLayout';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../context/FirestoreContext';

export default function chat() {
	// --- hooks ---
	const [error, setError] = useState('');
	const { messages, sendMessage } = useFirestore();
	const chatMessageRef = useRef();

	// --- chat ---

	console.log(messages);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const message = chatMessageRef.current.value;

		try {
			await sendMessage(message);
		} catch (err) {
			console.error(err);
			setError('Could not send message');
		}
	};

	return (
		<>
			{error && <p>{error}</p>}
			{messages?.map((msg) => (
				<Message key={msg.uid} message={msg} />
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
