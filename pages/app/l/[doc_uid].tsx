import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { I_User, useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';

interface I_ListItem {
	completed: boolean;
	text: string;
}

interface I_ListRes {
	title: string;
	users: string[];
	sections: string[];
}

export default function list_uid() {
	// --- hooks ---
	const [sections, setSections] = useState<object>({});
	const [sectionInput, setSectionInput] = useState({});
	console.log(sectionInput);
	const addTodoRef = useRef(null);
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	// get listRef from firestore
	const { listsDisplayRef, toggleTodoCompleted, addNewTodo } = useFirestore();
	// --- firestore ---
	// make query for current list document
	const listQuery = listsDisplayRef.doc(doc_uid);
	// subscribe user to snapshot of list disply
	const [listRes] = useDocumentData<I_ListRes>(listQuery);
	// make query for document with list_uid
	const todosQuery = listsDisplayRef.doc(doc_uid).collection('todos');
	// subscribe user to snapshot of this list document
	const [todosRes] = useCollection(todosQuery);
	useEffect(() => {
		const newTodosRes = todosRes?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
		}));
		let newTodos = {};
		listRes?.sections?.forEach((section) => (newTodos[section] = []));
		newTodosRes?.forEach((todo) => newTodos[todo?.section]?.push(todo));
		setSections(newTodos);
	}, [todosRes, listRes]);

	// handle sumbit of adding new todo
	function handleAddNewTodo(section) {
		// get and reset ref value
		const text = sectionInput[section];
		setSectionInput({ ...sectionInput, [section]: '' });
		// create new todo
		addNewTodo(doc_uid, text, section);
	}
	return (
		<div>
			{Object?.keys(sections)?.map((section) => (
				<div className='flex flex-col gap-2'>
					<h3>{section}</h3>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleAddNewTodo(section);
						}}
					>
						<input
							type='text'
							value={sectionInput[section]}
							onChange={(e) =>
								setSectionInput({ ...sectionInput, [section]: e.target.value })
							}
						/>
						<button type='submit'>Add new todo</button>
					</form>
					{sections[section]?.map((todo) => (
						<button
							className=' flex w-full gap-2 items-center p-2 rounded bg-blue-50 focus:ring-4 ring-blue-200 focus:outline-none'
							onClick={() =>
								toggleTodoCompleted(doc_uid, todo.id, todo.completed)
							}
							key={todo.text}
						>
							<div className='h-5 w-5 rounded-full border-transparent border-2 overflow-hidden ring-opacity-100 ring-2'>
								<div
									className='h-full w-full  bg-blue-500'
									style={{
										clipPath: todo.completed
											? 'ellipse(100% 100% at 50% 50%)'
											: 'ellipse(0% 0% at 50% 50%)',
										transition: 'clip-path 500ms ease-in-out',
									}}
								></div>
							</div>
							<p>{todo?.text}</p>
						</button>
					))}
				</div>
			))}
		</div>
	);
}
