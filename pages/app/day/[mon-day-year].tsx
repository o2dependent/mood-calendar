import React from 'react';
import { GetServerSideProps } from 'next';

export default function DayPage() {
	return <div></div>;
}

// --- SSR ---

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	// get month day and year from query
	const [month, day, year]: Array<string> = (query[
		'mon-day-year'
	] as string).split('-');
	console.log({ month, day, year });
	// get current month's events from API

	// return day's events
	return {
		props: {
			events: [],
		},
	};
};
