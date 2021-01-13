import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import AppLayout from '../layout/AppLayout';
import CalendarDays from './CalendarDays';
import CalendarHeader from './CalendarHeader';

// --- ts interfaces ---
// for month event when getting days
interface MonthEvent {
	day: number;
}
// for days state in main calendar component
interface Day {
	month: string;
	year: number;
	day: number;
	moods: boolean;
}

/* day event shape
  {
    month: 'Dec',
    year: '2020',
    day: 20,
    moods: [
      {
        happiness: 0,
        anxiety: 3,
        time: '12:13',    // moment().format('H:m')
      },
      {
        happiness: 5,
        anxiety: 0,
        time: '1:35',    // moment().format('H:m')
      }
    ]
  }
*/

// --- context mimic ---
const getDays = (curMonth: string, curYear: number) => {
	// get events from API

	const monthEventArr: Array<MonthEvent> = [
		{ day: 21 },
		{ day: 25 },
		{ day: 30 },
	];
	// find last day of the month
	const monthEndDate = Number(
		moment(curMonth, 'MMM').endOf('month').format('D')
	);
	// get all days in the month
	let daysArr = Array(monthEndDate)
		.fill(null)
		.map((x, i) => ({
			month: curMonth,
			year: curYear,
			day: String(i + 1),
			moods: false,
		}));
	// find how many days needed to fill calendar
	const emptyDays = Array(
		moment(`${curMonth}-1-${curYear}`, 'MMM-D-YYYY').weekday()
	)
		.fill(null)
		.map((x) => ({}));
	// put all of the months events into the days array
	monthEventArr.forEach((event: MonthEvent) => {
		daysArr[event.day - 1].moods = true;
	});
	return [...emptyDays, ...daysArr];
};

// --- component ---
export default function Calendar() {
	// --- variables ---
	const m = moment();
	const curDate = m.format('MMM-D-YYYY');

	// --- state ---
	const [days, setDays] = useState([]);
	const [curMonth, setCurMonth] = useState(m.format('MMM'));
	const [curYear, setCurYear] = useState(Number(m.format('YYYY')));

	// --- hooks ---
	useEffect(() => {
		setDays(getDays(curMonth, curYear));
	}, [curMonth, curYear]);

	// --- markup ---
	return (
		<AppLayout>
			<CalendarWrapper rows={Math.ceil(days.length / 7)}>
				<CalendarHeader
					curMonth={curMonth}
					setCurMonth={setCurMonth}
					curYear={curYear}
					setCurYear={setCurYear}
				/>
				<CalendarDays days={days} curDate={curDate} />
			</CalendarWrapper>
		</AppLayout>
	);
}

// --- styled components ---

const CalendarWrapper = styled.div`
	width: 100%;
	min-height: 100%;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: 0.5fr 0.5fr repeat(${(p) => p.rows}, 1fr);
	background-color: ${colors.dark.secondary}fa;
`;
