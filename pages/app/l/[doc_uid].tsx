import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { I_User, useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';

interface I_ListItem {
	completed: boolean;
	text: string;
	section: string;
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
	const [isAddFriendMenuOpen, setIsAddFriendMenuOpen] = useState(false);
	const newSectionRef = useRef(null);
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	// get listRef from firestore
	const {
		listsDisplayRef,
		toggleTodoCompleted,
		deleteSection,
		addNewTodo,
		addNewSection,
		deleteTodo,
		friends,
		addFriendToList,
	} = useFirestore();
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

	// handle submit of aqdding new section
	function handleAddNewSection(e) {
		e.preventDefault();
		// get value and reset ref
		const section = getValueFromRef(newSectionRef);
		resetRefValue(newSectionRef);
		// create new section
		addNewSection(doc_uid, section);
	}
	// handle toggling or deleting todo
	function handleTodoClick(todoId: string, todoCompleted: boolean) {
		// if list setting is to delete else toggle
		deleteTodo(doc_uid, todoId);
		// toggleTodoCompleted(doc_uid, todoId, todoCompleted)
	}
	document.body.setAttribute('class', 'dark');
	console.log(document.body.classList.contains('dark'));
	return (
		<div className='flex flex-col flex-grow overflow-hidden'>
			<div className='px-2'>
				<h2>{listRes?.title}</h2>
				<button onClick={() => setIsAddFriendMenuOpen(!isAddFriendMenuOpen)}>
					Add friend to list
				</button>
			</div>
			{isAddFriendMenuOpen && (
				<div className='px-2'>
					{friends &&
						friends.map((friend) => {
							return listRes?.users?.includes(friend) ? null : (
								<button
									onClick={() => addFriendToList(doc_uid, friend)}
									key={friend}
									className='flex items-center bg-gray-200 h-14 w-full p-2'
								>
									<p className=''>{friend}</p>
								</button>
							);
						})}
				</div>
			)}
			<div className='h-full flex-grow flex flex-nowrap overflow-x-scroll gap-2 px-2'>
				{Object?.keys(sections)?.map((section) => (
					<div
						className='flex md:w-96 md:min-w-max min-w-9/10 flex-col gap-2'
						key={section}
					>
						<h3>{section}</h3>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleAddNewTodo(section);
							}}
						>
							<input
								placeholder={`Add item to ${section}`}
								type='text'
								value={sectionInput[section]}
								onChange={(e) =>
									setSectionInput({
										...sectionInput,
										[section]: e.target.value,
									})
								}
							/>
							<button type='submit'>Add new todo</button>
						</form>
						{sections[section]?.length === 0 && (
							<button onClick={() => deleteSection(doc_uid, section)}>
								Delete section
							</button>
						)}
						{sections[section]?.map((todo) => (
							<button
								key={todo.text}
								className='grid w-full gap-2 hover:bg-gray-50 transition-colors bg-opacity-5 dark:hover:bg-gray-700  shadow-md dark:shadow-md-dark items-center p-2 rounded focus:ring-4 ring-blue-200 focus:outline-none'
								style={{
									gridTemplateColumns: '1.25rem 1fr',
								}}
								onClick={() => handleTodoClick(todo.id, todo.completed)}
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
								<p className='text-left'>{todo?.text}</p>
							</button>
						))}
					</div>
				))}
				<form
					className='flex md:w-96 md:min-w-max min-w-9/10 flex-col gap-2'
					onSubmit={handleAddNewSection}
				>
					<input
						placeholder='Add a new section'
						type='text'
						ref={newSectionRef}
					/>
					<button type='submit'>Add new section</button>
				</form>
			</div>
		</div>
	);
}
