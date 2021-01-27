import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { I_User, useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';

interface I_ListItem {
	completed: boolean;
	text: string;
}

interface I_List {
	items: I_ListItem[];
	title: string;
	users: I_User[];
}

export default function list_uid() {
	// --- hooks ---
	const [todos, setTodos] = useState([]);
	const addTodoRef = useRef(null);
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	// get listRef from firestore
	const { todosRef, toggleTodoCompleted, addNewTodo } = useFirestore();
	// --- firestore ---
	// make query for document with list_uid
	const query = todosRef.where('listId', '==', doc_uid);
	// subscribe user to snapshot of this list document
	const [todosRes] = useCollection(query);
	useEffect(() => {
		const newTodos = todosRes?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
		}));
		setTodos(newTodos);
	}, [todosRes]);

	console.log(todos);

	// handle sumbit of adding new todo
	function handleAddNewTodo(e) {
		e.preventDefault();
		// get and reset ref value
		const text = getValueFromRef(addTodoRef);
		resetRefValue(addNewTodo);
		// create new todo
		addNewTodo(doc_uid, text);
	}

	return (
		<div>
			{todos?.length > 0 &&
				todos?.map((todo) => (
					<div className='bg-green-300'>
						<button
							onClick={() => toggleTodoCompleted(todo.id, todo.completed)}
						>
							{todo?.completed ? 'completed' : 'not completed'}
						</button>
						<p>{todo?.text}</p>
					</div>
				))}
			<form onSubmit={handleAddNewTodo}>
				<input type='text' ref={addTodoRef} />
				<button type='submit'>Add new todo</button>
			</form>
		</div>
	);
}
