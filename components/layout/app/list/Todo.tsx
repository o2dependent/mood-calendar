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
			borderWidth: '0px',
			height: '0rem',
			padding: '0rem 0rem',
			margin: '0rem 0rem 0rem 0rem',
			transition: {
				duration: 0.5,
			},
		},
		animate: {
			borderWidth: '1px',
			height: '2.5rem',
			padding: '0.5rem 0.5rem',
			margin: '0rem 0rem 1rem 0rem',
			transition: {
				duration: 0.5,
			},
		},
	};
	return (
		<motion.button
			whileHover={{ scale: 1.05 }}
			whileFocus={{ scale: 1.05 }}
			variants={todoVariant}
			initial='initial'
			animate='animate'
			exit='initial'
			key={todo.id}
			className='todo mb-4 overflow-hidden grid w-96 max-w-full gap-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors bg-opacity-5 items-center p-2 rounded border border-gray-500 border-opacity-50  focus:bg-gray-50 focus:hover:bg-gray-900 focus:ring-2 ring-blue-200 ring-opacity-20 focus:outline-none'
			style={{
				gridTemplateColumns: '1.25rem 1fr',
			}}
			onClick={() => handleTodoClick(todo.id, todo.completed)}
		>
			<div
				className={`todo-checkbox-container flex justify-center items-center h-5 w-5 bg-${priority}-500 rounded-full border-2 overflow-hidden border-${priority}-500`}
			>
				<div
					className={`todo-checkbox h-3/4 w-3/4 bg-${priority}-500 bg-opacity-50 rounded-full`}
				></div>
			</div>
			<p className='text-left'>{todo?.text}</p>
		</motion.button>
	);
}
