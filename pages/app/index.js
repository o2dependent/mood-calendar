import Link from 'next/link';
import React from 'react';
import WithAuth from '../../components/middleware/withAuth';

export default function index() {
	return (
		<WithAuth>
			<div>
				<Link href='/app/calendar'>
					<a>Calendar</a>
				</Link>
			</div>
		</WithAuth>
	);
}
