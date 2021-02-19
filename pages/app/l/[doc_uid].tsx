import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import Section from '../../../components/layout/app/list/Section';
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
	const [sectionNames, setSectionNames] = useState<string[]>([]);
	const [isAddFriendMenuOpen, setIsAddFriendMenuOpen] = useState(false);
	const newSectionRef = useRef(null);
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	// get listRef from firestore
	const {
		listsDisplayRef,
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
		resetRefValue(newSectionRef);
		// create new section
		addNewSection(doc_uid, section);
	}

	// handle delting list
	function handleDeleteList() {
		deleteList(doc_uid);
		router.push('/app');
	}

	return (
		!loading && (
			<div className='flex flex-col flex-grow overflow-hidden'>
				<div className='px-2 grid grid-rows-2  md:px-6'>
					<h2>{listRes?.title}</h2>
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
								return listRes?.users?.includes(friend) ? null : (
									<button
										onClick={() => addFriendToList(doc_uid, friend)}
										key={friend}
										className='flex items-center rounded dark:bg-gray-800 bg-gray-200 h-10 w-full p-2'
									>
										<p className=''>{friend}</p>
									</button>
								);
							})}
					</div>
				)}
				<div
					style={{
						gridTemplateColumns: `repeat(${sectionNames?.length + 1}, 24rem)`,
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
		)
	);
}
