import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../../../context/FirestoreContext';
import getPriorityColor from '../../../../helpers/getPriorityColor';
import Todo from './Todo';

export default function Section({ section, doc_uid, sectionArr }) {
	// --- hooks ---
	// state
	const [isAddSectionTodoOpen, setIsAddSectionTodoOpen] = useState<boolean>(
		false
	);
	const [sectionInput, setSectionInput] = useState<string>('');
	const [sectionInputPriority, setsectionInputPriority] = useState<number>(4);
	const [sortedSectionArr, setSortedSectionArr] = useState(sectionArr);
	// firestore
	const { deleteSection, addNewTodo } = useFirestore();

	// on did mount
	useEffect(() => {
		setSortedSectionArr(sectionArr.sort((x, y) => x.priority - y.priority));
	}, [sectionArr]);

	// --- functions ---
	// handle sumbit of adding new todo
	function handleAddNewTodo() {
		// get and reset ref value
		const text = sectionInput;
		const priority = sectionInputPriority;
		setSectionInput('');
		setsectionInputPriority(4);
		// create new todo
		addNewTodo(doc_uid, text, section, priority);
	}
	// --- framer motion variants ---
	const sectionVariant = {
		initial: {
			opacity: 0,
			transition: {
				staggerChildren: 0.5,
			},
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.25,
				staggerChildren: 0.5,
			},
		},
	};
	const todoContainerVariant = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
	};

	return (
		<motion.div
			variants={sectionVariant}
			initial='initial'
			animate='animate'
			className='flex md:w-96 md:min-w-max min-w-9/10 flex-col gap-4'
			key={section}
		>
			<div className='flex justify-between'>
				<h3>{section}</h3>

				{sortedSectionArr?.length === 0 && (
					<button
						className='w-8 h-8 opacity-50 hover:opacity-100 flex justify-center items-center rounded text-red-500 border border-red-500'
						onClick={() => deleteSection(doc_uid, section)}
					>
						<svg
							fill='currentColor'
							xmlns='http://www.w3.org/2000/svg'
							width='65%'
							height='65%'
							viewBox='0 0 24 24'
						>
							<path d='M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z' />
						</svg>
					</button>
				)}
			</div>
			<motion.div
				className='w-100 flex flex-col gap-4'
				variants={todoContainerVariant}
				initial='initial'
				animate='animate'
				exit='initial'
			>
				<AnimatePresence>
					{sortedSectionArr?.map((todo) => (
						<Todo key={todo.id} todo={todo} doc_uid={doc_uid} />
					))}
				</AnimatePresence>
			</motion.div>
			{isAddSectionTodoOpen ? (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleAddNewTodo();
					}}
				>
					<input
						className='mb-2'
						placeholder={`Add item to ${section}`}
						type='text'
						value={sectionInput}
						onChange={(e) => setSectionInput(e.target.value)}
					/>
					<select
						className={`text-${getPriorityColor(
							sectionInputPriority
						)}-500 p-1 rounded bg-gray-50 dark:bg-gray-800 border border-gray-500 border-opacity-50 mb-2`}
						value={sectionInputPriority}
						onChange={(e) => setsectionInputPriority(Number(e.target.value))}
						name='priority'
					>
						<option className='text-red-500' value={1}>
							P1
						</option>
						<option className='text-yellow-500' value={2}>
							P2
						</option>
						<option className='text-blue-500' value={3}>
							P3
						</option>
						<option className='text-gray-500' value={4}>
							P4
						</option>
					</select>
					<div className='flex justify-start gap-4'>
						<button
							className='hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-opacity-5 p-2 rounded border border-gray-500 border-opacity-50 focus:ring-2 ring-blue-200 ring-opacity-20 focus:outline-none'
							type='submit'
						>
							Add todo
						</button>
						<button
							className='py-2 text-red-500 hover:underline'
							type='button'
							onClick={() => setIsAddSectionTodoOpen(false)}
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<button
					className='w-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors bg-opacity-5 p-2 rounded border border-gray-500 border-opacity-50 focus:ring-2 ring-blue-200 ring-opacity-20 focus:outline-none'
					onClick={() => setIsAddSectionTodoOpen(true)}
				>
					Add new todo
				</button>
			)}
		</motion.div>
	);
}
