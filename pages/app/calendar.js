import React from 'react';
import Calendar from '../../components/calendar/Calendar';
import WithAuth from '../../components/middleware/withAuth';

export default function calendar() {
	return (
		<WithAuth>
			<Calendar />
		</WithAuth>
	);
}
