import Link from 'next/link';
import React, { useRef } from 'react';
import { useFirestore } from '../../../../context/FirestoreContext';
import { getValueFromRef } from '../../../../helpers/getValueFromRef';
import resetRefValue from '../../../../helpers/resetRefValue';

export default function Lists({ closeMenu }) {
	// --- hooks ---
	const { lists, addNewList } = useFirestore();
	const newListRef = useRef(null);

	// --- functions ---
	const handleAddNewList = (e) => {
		e.preventDefault();
		// get and clear value from ref
		const title = getValueFromRef(newListRef);
		if (title !== '') {
			resetRefValue(newListRef);
			// create new list
			addNewList(title);
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<form className='flex min-w-9/10 gap-2' onSubmit={handleAddNewList}>
				<input
					className='flex-grow '
					placeholder='Add a new list'
					type='text'
					ref={newListRef}
				/>
				<button
					className='w-10 h-10 text-red-500 border-2 p-2 border-red-500 rounded text-2xl flex justify-center items-center'
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
			</form>
			{lists?.length > 0 &&
				lists.map((list) => (
					<Link href={`/app/l/${list.id}`} key={list.id}>
						<a
							onClick={closeMenu}
							className='flex items-center dark:bg-gray-800 bg-gray-200 h-12 w-full p-2 rounded border border-white border-opacity-10 hover:bg-gray-300 dark:hover:bg-gray-900'
						>
							<p className=''>{list.title}</p>
						</a>
					</Link>
				))}
		</div>
	);
}
