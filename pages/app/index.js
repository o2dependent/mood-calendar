import Link from 'next/link';
import React from 'react';
import WithAuth from '../../components/middleware/withAuth';
import AppLayout from '../../components/layout/AppLayout';
import { useAuth } from '../../context/AuthContext';

export default function index() {
	return (
		<WithAuth>
			<AppLayout>
				<div>
					<Link href='/app/chat'>
						<a>Chat</a>
					</Link>
				</div>
			</AppLayout>
		</WithAuth>
	);
}
