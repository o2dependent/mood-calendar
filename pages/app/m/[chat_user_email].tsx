import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../../context/AuthContext';
import { useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';

interface I_Message {
	text: string;
	sender: string;
	createdAt: any;
}

interface I_MessageRes {
	messages: I_Message[];
}

export default function chat() {
	// --- hooks ---
	const [messages, setMessages] = useState<Array<I_Message>>([]);
	const { currentUser } = useAuth();
	const { messagesRef, sendMessage } = useFirestore();
	const router = useRouter();
	const { chat_user_email } = router.query;
	const docName = [currentUser.email, chat_user_email].sort().join('_');
	const chatMessageRef = useRef();

	// --- query ---
	const query = messagesRef.doc(docName);
	const [messagesRes] = useDocumentData<I_MessageRes>(query);
	useEffect(() => {
		const newMessages = messagesRes?.messages;
		setMessages(newMessages);
	}, [messagesRes]);

	// send message on submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const message: string = getValueFromRef(chatMessageRef);
		resetRefValue(chatMessageRef);

		try {
			await sendMessage(message, docName);
		} catch (err) {
			console.error(err);
			// setError('Could not send message');
		}
	};

	return (
		<div className='flex w-full'>
			<div className='h-16 pl-4 dark:bg-gray-900 w-96'>
				<p>fuckkin what</p>
			</div>
			<div className='flex flex-col justify-end w-full max-w-screen-lg h-full ml-4'>
				{messages?.length > 0 && messages.map((msg) => <Message msg={msg} />)}
				<form onSubmit={handleSubmit} className='h-12'>
					<input
						className='fixed bottom-1 left-0 md:static mb-0'
						type='text'
						required
						ref={chatMessageRef}
					/>
				</form>
			</div>
		</div>
	);
}

function Message({ msg }) {
	const { text, email } = msg;
	const { currentUser } = useAuth();
	const messageClass =
		email === currentUser.email
			? 'ml-auto bg-gray-200 dark:text-black rounded-br-none'
			: 'bg-red-500 text-white rounded-bl-none';
	const containerClass = email === currentUser.email ? 'ml-auto' : '';

	return (
		<div className={`mb-2 max-w-10/12 h-auto ${containerClass}`}>
			<p
				className={`rounded-xl cursor-default max-w-prose p-2 px-4 inline-block w-auto ${messageClass}`}
			>
				{text}
			</p>
		</div>
	);
}
