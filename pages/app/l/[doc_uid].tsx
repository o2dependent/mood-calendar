import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import Section from '../../../components/layout/app/list/Section';
import { I_User, useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';
import useScrollOnDrag from '../../../hooks/useScrollOnDrag';

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
	const [sectionNames, setSectionNames] = useState<string[]>([]);
	const [isAddFriendMenuOpen, setIsAddFriendMenuOpen] = useState(false);
	const newSectionRef = useRef(null);
	// section ref
	const sectionContainerRef = useRef(null);
	// section draggable scroll
	const { events } = useScrollOnDrag(sectionContainerRef, {
		onDragStart: () => {
			document.body.style.userSelect = 'none';
			sectionContainerRef.current.style.cursor = 'grabbing';
		},
		onDragEnd: () => {
			document.body.style.userSelect = '';
			sectionContainerRef.current.style.cursor = 'grab';
		},
	});
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	// get listRef from firestore
	const {
		listsDisplayRef,
		usersRef,
		deleteList,
		addNewSection,
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
	const [todosRes, loading] = useCollection(todosQuery);
	useEffect(() => {
		const newTodosRes = todosRes?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
		}));
		let newTodos = {};
		listRes?.sections?.forEach((section) => (newTodos[section] = []));
		newTodosRes?.forEach((todo) => newTodos[todo?.section]?.push(todo));
		setSections(newTodos);
		setSectionNames(Object?.keys(newTodos));
	}, [todosRes, listRes]);

	// handle submit of aqdding new section
	function handleAddNewSection(e) {
		e.preventDefault();
		// get value and reset ref
		const section = getValueFromRef(newSectionRef);
		console.log({ section, secEqu: section === '' });
		if (section !== '') {
			resetRefValue(newSectionRef);
			// create new section
			addNewSection(doc_uid, section);
		}
	}

	// handle delting list
	function handleDeleteList() {
		deleteList(doc_uid);
		router.push('/app');
	}

	return (
		!loading && (
			<div className='flex flex-col flex-grow overflow-hidden pt-10'>
				<div className='px-2 grid grid-rows-2  md:px-6'>
					<h2 className='text-4xl mb-4'>{listRes?.title}</h2>
					<div className='flex w-full justify-between mb-4'>
						<button
							className='btn'
							onClick={() => setIsAddFriendMenuOpen(!isAddFriendMenuOpen)}
						>
							Add friend to list
						</button>
						<button className='btn-hollow ml-auto' onClick={handleDeleteList}>
							Delete List
						</button>
					</div>
				</div>
				{isAddFriendMenuOpen && (
					<div className='flex flex-col gap-2 px-2 md:px-6'>
						{friends &&
							friends.map((friend) => {
								return listRes?.users?.includes(friend?.email) ? null : (
									<button
										onClick={() => addFriendToList(doc_uid, friend)}
										key={friend?.email}
										className='flex items-center rounded dark:bg-gray-800 bg-gray-200 h-10 w-full p-2'
									>
										<p className=''>{friend?.displayName}</p>
									</button>
								);
							})}
					</div>
				)}
				<div
					{...events}
					ref={sectionContainerRef}
					style={{
						gridTemplateColumns: `repeat(${sectionNames?.length + 1}, 24rem)`,
						cursor: 'grab',
					}}
					className='h-full flex-grow grid break-all overflow-x-scroll gap-4 px-2 md:px-6'
				>
					{sectionNames?.map((section) => (
						<Section
							sectionArr={sections[section]}
							section={section}
							doc_uid={doc_uid}
							key={section}
						/>
					))}
					<form
						className='flex md:w-96 md:min-w-max min-w-9/10 flex-col gap-4 mt-4'
						onSubmit={handleAddNewSection}
					>
						<div className='h-8' />
						<div className='flex w-full'>
							<input
								placeholder='Add a new section'
								type='text'
								ref={newSectionRef}
							/>
							<button
								className='w-10 h-10 rounded bg-gray-500 flex justify-center items-center'
								type='submit'
							>
								<svg
									fill='currentColor'
									xmlns='http://www.w3.org/2000/svg'
									width='17'
									height='17'
									viewBox='0 0 24 24'
								>
									<path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z' />
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}
