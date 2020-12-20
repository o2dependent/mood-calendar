import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import colors from '../../styles/colors';

// --- component ---
export default function CalendarDays({ days, curDate }) {
	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	// --- markup ---
	return (
		<>
			{weekDays.map((day) => (
				<CalendarWeekDay>
					<p>{day}</p>
				</CalendarWeekDay>
			))}
			{days.map((day) =>
				day?.month ? (
					<CalendarDay
						key={`${day.month}-${day.day}-${day.year}`}
						curDate={curDate === `${day.month}-${day.day}-${day.year}`}
						hasMood={day.moods}
					>
						<Link href={`/app/day/${day.month}-${day.day}-${day.year}`}>
							<a>{day.day}</a>
						</Link>
					</CalendarDay>
				) : (
					<div />
				)
			)}
		</>
	);
}

// --- styled components ---
const CalendarDay = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${colors.dark.secondary};
	color: ${colors.dark.text};
	border-bottom: 1px solid ${colors.dark.accent};
	border-top: ${(p) =>
		p.curDate
			? `3px solid ${colors.light.secondary}`
			: '3px solid transparent'};
	&:hover {
		border-bottom: 2px solid ${colors.dark.tertiary};
	}
	transition: border 100ms;
`;

const CalendarWeekDay = styled.div`
	padding: 5%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: ${colors.dark.accent};
	color: ${colors.dark.text};
	border-bottom: 1px solid ${colors.light.primary};
	p {
		font-size: large;
	}
`;
