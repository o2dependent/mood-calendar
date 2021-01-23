import Link from 'next/link';
import React from 'react';
import { useFirestore } from '../../../context/FirestoreContext';

export default function Lists({ closeMenu }) {
	// --- hooks ---
	const { lists } = useFirestore();

	return (
		<div>
			{lists?.length > 0 &&
				lists.map((list) => (
					<Link href={`/app/l/${list.doc_id}`}>
						<a
							onClick={closeMenu}
							key={list.title}
							className='flex items-center bg-gray-200 h-14 w-full p-2'
						>
							<p className=''>{list.title}</p>
						</a>
					</Link>
				))}
		</div>
	);
}
