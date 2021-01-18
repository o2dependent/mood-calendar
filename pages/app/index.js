import Link from 'next/link';
import React from 'react';
import WithAuth from '../../components/middleware/withAuth';
import AppLayout from '../../components/layout/app/AppLayout';

export default function index() {
	return (
		<WithAuth>
			<div></div>
		</WithAuth>
	);
}
