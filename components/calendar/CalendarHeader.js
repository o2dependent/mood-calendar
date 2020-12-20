import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import colors from '../../styles/colors';

// --- component ---
export default function CalendarHeader({
	curMonth,
	setCurMonth,
	curYear,
	setCurYear,
}) {
	// --- variables ---
	const monthsShort = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	// --- functions ---
	// change cur month - 1
	const prevMonth = () => {
		const curMonthIdx = monthsShort.indexOf(curMonth) - 1;
		if (curMonthIdx < 0) {
			setCurMonth(monthsShort[11]);
			setCurYear(curYear - 1);
		} else {
			setCurMonth(monthsShort[curMonthIdx]);
		}
	};
	// change cur month + 1
	const nextMonth = () => {
		const newMonthIdx = monthsShort.indexOf(curMonth) + 1;
		if (newMonthIdx > 11) {
			setCurMonth(monthsShort[0]);
			setCurYear(curYear + 1);
		} else {
			setCurMonth(monthsShort[newMonthIdx]);
		}
	};
	// change to cur date
	const currentDate = () => {
		const m = moment();
		setCurMonth(m.format('MMM'));
		setCurYear(Number(m.format('YYYY')));
	};
	// --- markup ---
	return (
		<HeaderContainer>
			<select value={curYear} onChange={(e) => setCurYear(e.target.value)}>
				{Array(6)
					.fill(null)
					.map((mon, idx) => (
						<option value={curYear - 3 + idx}>{curYear - 3 + idx}</option>
					))}
			</select>
			<select value={curMonth} onChange={(e) => setCurMonth(e.target.value)}>
				{monthsShort.map((mon) => (
					<option value={mon}>{mon}</option>
				))}
			</select>
			<button onClick={currentDate}>Current day</button>
			<button onClick={prevMonth}>Previous</button>
			<button onClick={nextMonth}>Next</button>
		</HeaderContainer>
	);
}

// --- styled components ---

const HeaderContainer = styled.div`
	background-color: ${colors.dark.primary};
	width: 100%;
	grid-column-start: 1;
	grid-column-end: 8;
	grid-row-start: 1;
	grid-row-end: 2;
`;
