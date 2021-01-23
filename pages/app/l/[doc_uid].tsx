import { useRouter } from 'next/router';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { I_User, useFirestore } from '../../../context/FirestoreContext';

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
	// get list_uid from page query
	const router = useRouter();
	const { doc_uid } = router.query;
	console.log(doc_uid);
	// get listRef from firestore
	const { listsRef } = useFirestore();
	// --- firestore ---
	// make query for document with list_uid
	const query = listsRef.doc(doc_uid);
	// subscribe user to snapshot of this list document
	const [list] = useDocumentData<I_List>(query);
	console.log(list);
	return (
		<div>
			{list?.items?.map((item) => (
				<p>{item.text}</p>
			))}
		</div>
	);
}
