import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
	useCollectionData,
	useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useAuth } from '../../context/AuthContext';
import { useFirestore } from '../../context/FirestoreContext';
import { getValueFromRef } from '../../helpers/getValueFromRef';
import resetRefValue from '../../helpers/resetRefValue';

interface I_Message {
	text: string;
	sender: string;
	createdAt: any;
}

interface I_MessageRes {
	messages: I_Message[];
}

interface I_ChatProps {
	userEmail: string;
}

export default function Chat({ doc_uid }) {
	// --- hooks ---
	const [messages, setMessages] = useState<Array<I_Message>>([]);
	const { currentUser } = useAuth();
	const { listsDisplayRef, sendMessage } = useFirestore();
	const chatMessageRef = useRef();
	const dummyRef = useRef();

	// --- query ---
	const query = listsDisplayRef
		.doc(doc_uid)
		.collection('messages')
		.orderBy('createdAt', 'asc');
	const [messagesRes] = useCollectionData<I_Message>(query);
	useEffect(() => {
		const newMessages = messagesRes;
		setMessages(newMessages);
		if (dummyRef?.current) {
			dummyRef?.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messagesRes]);

	// send message on submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const message: string = getValueFromRef(chatMessageRef);
		resetRefValue(chatMessageRef);

		try {
			await sendMessage(message, doc_uid);
		} catch (err) {
			console.error(err);
			// setError('Could not send message');
		}
	};

	return (
		<div className='h-full w-full flex-grow break-all overflow-y-scroll'>
			<div className='flex flex-col justify-end overflow-y-scroll w-full'>
				{messages?.length > 0 &&
					messages.map((msg, idx, arr) => (
						<Message msg={msg} idx={idx} arr={arr} />
					))}
				<div ref={dummyRef} />
			</div>
			<form onSubmit={handleSubmit} className='h-12 w-full'>
				<input
					className='w-full mb-0 bg-gray-200'
					type='text'
					required
					ref={chatMessageRef}
				/>
			</form>
		</div>
	);
}

function Message({ msg, idx, arr }) {
	const { text, email } = msg;
	const { currentUser } = useAuth();
	console.log(email === currentUser.email);
	const messageClass =
		email === currentUser.email
			? 'bg-gray-200 dark:text-black ml-auto'
			: 'bg-red-500 text-white';
	const containerClass = email === currentUser.email ? 'justify-end' : '';
	const isNameVisible = idx === 0 || email !== arr[idx - 1]?.email;

	return (
		<div className={`mb-2 max-w-10/12 h-auto flex flex-col ${containerClass}`}>
			{isNameVisible && (
				<p className={`mx-1 ${email === currentUser.email && 'ml-auto'}`}>
					{email}
				</p>
			)}
			<p
				className={`w-max rounded-2xl cursor-default max-w-prose p-2 px-4 inline-block ${messageClass}`}
			>
				{text}
			</p>
		</div>
	);
}
