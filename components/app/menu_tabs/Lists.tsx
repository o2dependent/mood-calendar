import Link from 'next/link';
import React, { useRef } from 'react';
import { useFirestore } from '../../../context/FirestoreContext';
import { getValueFromRef } from '../../../helpers/getValueFromRef';
import resetRefValue from '../../../helpers/resetRefValue';

export default function Lists({ closeMenu }) {
	// --- hooks ---
	const { lists, addNewList } = useFirestore();
	const newListRef = useRef(null);

	// --- functions ---
	const handleAddNewList = (e) => {
		e.preventDefault();
		// get and clear value from ref
		const title = getValueFromRef(newListRef);
		resetRefValue(newListRef);
		// create new list
		addNewList(title);
	};

	return (
		<div className='flex flex-col gap-4'>
			<form
				className='inline-flex min-w-9/10 flex-col gap-2'
				onSubmit={handleAddNewList}
			>
				<input placeholder='Add a new list' type='text' ref={newListRef} />
				<button type='submit'>Add new list</button>
			</form>
			{lists?.length > 0 &&
				lists.map((list) => (
					<Link href={`/app/l/${list.id}`} key={list.id}>
						<a
							onClick={closeMenu}
							className='flex items-center rounded shadow-md dark:bg-gray-800 bg-gray-200 dark:shadow-md-dark h-11 w-full p-2'
						>
							<p className=''>{list.title}</p>
						</a>
					</Link>
				))}
		</div>
	);
}
