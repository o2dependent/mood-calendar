import { motion } from 'framer-motion';
import React from 'react';
import { useFirestore } from '../../../../context/FirestoreContext';
import getPriorityColor from '../../../../helpers/getPriorityColor';

export default function Todo({ todo, doc_uid }) {
	// --- variables ----
	// check box color
	const priority = getPriorityColor(todo?.priority ?? 4);
	// --- hooks ---
	// firestore
	const { deleteTodo } = useFirestore();

	// --- functions ---
	// handle toggling or deleting todo
	function handleTodoClick(todoId: string, todoCompleted: boolean) {
		// if list setting is to delete else toggle
		deleteTodo(doc_uid, todoId);
		// toggleTodoCompleted(doc_uid, todoId, todoCompleted)
	}

	// --- framer motion variants ---
	const todoVariant = {
		initial: {
			opacity: 0,
			transition: {
				duration: 0.5,
			},
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 1,
			},
		},
	};
	return (
		<motion.button
			variants={todoVariant}
			initial='initial'
			animate='animate'
			exit='initial'
			key={todo.id}
			className='grid w-96 max-w-full gap-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors bg-opacity-5 items-center p-2 rounded border border-gray-500 border-opacity-50 focus:ring-2 ring-blue-200 ring-opacity-20 focus:outline-none'
			style={{
				gridTemplateColumns: '1.25rem 1fr',
			}}
			onClick={() => handleTodoClick(todo.id, todo.completed)}
		>
			<div
				className={`todo-checkbox-container h-5 w-5 rounded-full border-2 overflow-hidden border-${priority}-500`}
			>
				<div
					className={`todo-checkbox h-full w-full bg-${priority}-500 bg-opacity-50`}
				></div>
			</div>
			<p className='text-left'>{todo?.text}</p>
		</motion.button>
	);
}
