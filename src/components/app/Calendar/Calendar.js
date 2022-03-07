import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cal from 'calendar';

const monthNames = [
	{ large: 'Janurary', medium: 'Jan', small: 'Jan' },
	{ large: 'Februrary', medium: 'Feb', small: 'Feb' },
	{ large: 'March', medium: 'Mar', small: 'Mar' },
	{ large: 'April', medium: 'Apr', small: 'Apr' },
	{ large: 'May', medium: 'May', small: 'May' },
	{ large: 'June', medium: 'Jun', small: 'Jun' },
	{ large: 'July', medium: 'Jul', small: 'Jul' },
	{ large: 'August', medium: 'Aug', small: 'Aug' },
	{ large: 'September', medium: 'Sep', small: 'Sep' },
	{ large: 'October', medium: 'Oct', small: 'Oct' },
	{ large: 'November', medium: 'Nov', small: 'Nov' },
	{ large: 'December', medium: 'Dec', small: 'Dec' }
];

const daysOfWeek = [
	{ large: 'Sunday', medium: 'Sun', small: 'Su' },
	{ large: 'Monday', medium: 'Mon', small: 'Mo' },
	{ large: 'Tuesday', medium: 'Tues', small: 'Tu' },
	{ large: 'Wednesday', medium: 'Wed', small: 'We' },
	{ large: 'Thursday', medium: 'Thurs', small: 'Th' },
	{ large: 'Friday', medium: 'Fri', small: 'Fr' },
	{ large: 'Saturday', medium: 'Sat', small: 'Sa' }
];

const getPrevMonthInfo = (currentYear, currentMonth) => {
	return currentMonth > 0 ?
		{ month: currentMonth - 1, year: currentYear } :
		{ month: 11, year: currentYear - 1 }
}

const calendar = new cal.Calendar();

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

function Calendar({
	year = today.getFullYear(),
	month = today.getMonth(),
	view = "month",
	size = "small",
	selectedDate = today,
	onDayClick,
	events,
	onEventMove,
	onEventAdd,
	eventRender,
	eventContainerClass,
}) {
	const [date, setDate] = useState({
		year: year,
		month: month,
		week: null,
		day: selectedDate.getDay(),
		numWeeks: null,
		prevNumWeeks: null
	});
	const [monthData, setMonthData] = useState({});

	useEffect(() => {
		const monthDates = calendar.monthDates(date.year, date.month, (d) => ({
			dayNumber: d.getDate().toString().slice(-2),
			ISODate: d.toISOString(),
			date: d
		}));
		const monthDays = calendar.monthDays(date.year, date.month);
		const prevMonthInfo = getPrevMonthInfo(date.year, date.month);
		const prevMonthDays = calendar.monthDays(prevMonthInfo.year, prevMonthInfo.month);
		
		const numWeeks = monthDays.length;
		const firstDay = monthDays[0].findIndex(day => day === 1);
		const lastDay = monthDays[numWeeks - 1].findIndex(day => day === 0) > 0 ? monthDays[numWeeks - 1].findIndex(day => day === 0) - 1 : 6;
		const prevNumWeeks = prevMonthDays.length;

		setMonthData({ dates: monthDates, days: monthDays });
		setDate(prev => ({ ...prev, numWeeks, firstDay, lastDay, prevNumWeeks }));
	}, [date.year, date.month]);

	useEffect(() => {
		setDate(prev => {
			const week = Math.ceil((prev.firstDay + selectedDate.getDate()) / 7) - 1;
			return { 
				...prev,
				month: selectedDate.getMonth(),
				week: week,
				day: selectedDate.getDay()
			}
		});
	}, [selectedDate]);

	useEffect(() => {
		const dayElements = document.querySelectorAll(".calendar-day");

		const handleDragEnter = (e) => {
			e.target.classList.add("drag-on");
			e.preventDefault();
		}
		const handleDragOver = (e) => {
			e.preventDefault();
		}
		const handleDragLeave = (e) => {
			e.target.classList.remove("drag-on");
		}
		const handleDrop = (e) => {
			e.preventDefault();
			e.dataTransfer.effectAllowed = "copyMove";
			const eventId = e.dataTransfer.getData("text/plain");
			const dropType = e.dataTransfer.getData("dropType");
			e.target.classList.remove("drag-on");
			const dropDate = new Date(e.target.childNodes[0].attributes['date'].value);
	
			if(dropType === "add") {
				onEventAdd && onEventAdd(Number(eventId), dropDate);
			} else {
				onEventMove && onEventMove(Number(eventId), dropDate);
			}

			//Revert pointer-events on each 'drop'. (Set to "none" on 'dragstart')
			document.querySelectorAll(".events-container").forEach(element => {
				element.style.pointerEvents = "revert";
			});
		}

		dayElements.forEach(element => {
			element.addEventListener('dragenter', handleDragEnter);
			element.addEventListener('dragover', handleDragOver);
			element.addEventListener('dragleave', handleDragLeave);
			element.addEventListener('drop', handleDrop);
		});

		return () => {
			dayElements.forEach(element => {
				element.removeEventListener('dragenter', handleDragEnter);
				element.removeEventListener('dragover', handleDragOver);
				element.removeEventListener('dragleave', handleDragLeave);
				element.removeEventListener('drop', handleDrop);
			});
		}
	}, [monthData.dates, onEventMove, onEventAdd]);

	useEffect(() => {
		const eventElements = document.querySelectorAll(".calendar-event");
		
		const handleDragStart = (e) => {
			const evt = e;
			const dataTransfer = evt.dataTransfer;
			const eventId = evt.target.id;
			dataTransfer.dropEffect = "copy";
			dataTransfer.setData("text/plain", eventId);
			//Turn off pointer-events for each event container.
			//This prevents triggering 'onleave' when entering child components.
			document.querySelectorAll(".events-container").forEach(element => {
				element.style.pointerEvents = "none";
			});
		}

		const handleDragEnd = (e) => {
			//Revert pointer-events on 'dragend'. (Set to "none" on 'dragstart')
			document.querySelectorAll(".events-container").forEach(element => {
				element.style.pointerEvents = "revert";
			});
			e.preventDefault();
		}

		eventElements.forEach(element => {
			element.addEventListener('dragstart', handleDragStart);
			element.addEventListener('dragend', handleDragEnd);
		});

		return () => {
			eventElements.forEach(element => {
				element.removeEventListener('dragstart', handleDragStart);
				element.removeEventListener('dragend', handleDragEnd);
			});
		}
	}, [monthData.dates, events]);

	const showNext = useCallback(() => {
		const showNextMonth = () => {
			setDate(prev => {
				if(prev.month < 11) return { ...prev, month: prev.month + 1, week: 0 }
				return { ...prev, year: prev.year + 1, month: 0, week: 0 }
			});
		}
		const showNextWeek = () => {
			setDate(prev => {
				if(prev.week < prev.numWeeks - 1) return { ...prev, week: prev.week + 1 }
				if(prev.month < 11) return { ...prev, month: prev.month + 1, week: 0 }
				return { ...prev, year: prev.year + 1, month: 0, week: 0 }
			});
		}
		const showNextDay = () => {
			setDate(prev => {
				if(prev.week < prev.numWeeks - 1) {
					if(prev.day < 6) return { ...prev, day: prev.day + 1 };
					return { ...prev, week: prev.week + 1, day: 0 }
				}
				if(prev.day < prev.lastDay) return { ...prev, day: prev.day + 1 }
				if(prev.month < 11) return { ...prev, month: prev.month + 1, week: 0, day: (prev.day + 1) % 7 }
				return { ...prev, year: prev.year + 1, month: 0, week: 0, day: (prev.day + 1) % 7 }
			});
		}
		switch (view) {
			case 'month':
				showNextMonth();
				break;
			case 'week':
				showNextWeek();
				break;
			case 'day':
				showNextDay();
				break;
			default: break;
		}
	}, [view]);

	const showPrev = useCallback(() => {
		const showPrevMonth = () => {
			setDate(prev => {
				if(prev.month > 0) return { ...prev, month: prev.month - 1, week: prev.prevNumWeeks - 1 }
				return { ...prev, year: prev.year - 1, month: 11, week: prev.prevNumWeeks - 1 }
			})
		}
		const showPrevWeek = () => {
			setDate(prev => {
				if(prev.week > 0) return { ...prev, week: prev.week - 1 }
				if(prev.month > 0) return { ...prev, month: prev.month - 1, week: prev.prevNumWeeks - 1 }
				return { ...prev, year: prev.year - 1, month: 11, week: prev.prevNumWeeks - 1 }
			})
		}
		const showPrevDay = () => {
			setDate(prev => {
				if(prev.week > 0) {
					if(prev.day > 0) return { ...prev, day: prev.day - 1 }
					return { ...prev, week: prev.week - 1, day: 6 }
				}
				if(prev.day > prev.firstDay) return { ...prev, day: prev.day - 1 };
				if(prev.month > 0) return { ...prev, month: prev.month - 1, week: prev.prevNumWeeks - 1, day: (prev.day - 1) % 7 }
				return { ...prev, year: prev.year - 1, month: 11, week: prev.prevNumWeeks - 1, day: (prev.day - 1) % 7 }
			});
		}
		switch (view) {
			case 'month':
				showPrevMonth();
				break;
			case 'week':
				showPrevWeek();
				break;
			case 'day':
				showPrevDay();
				break;
			default: break;
		}
	}, [view]);

	useEffect(() => {
		const buttons = document.querySelectorAll('button.control');
		const handleDragEnter = (e) => {
			e.target.classList.add("drag-on");
			if(e.target.id === "next") showNext();
			if(e.target.id === "prev") showPrev();
			e.preventDefault();
		}
		const handleDragOver = (e) => {
			e.preventDefault();
		}
		const handleDragLeave = (e) => {
			e.target.classList.remove("drag-on");
		}
		const handleDrop = (e) => {
			e.target.classList.remove("drag-on");
			e.preventDefault();
		}

		buttons.forEach(button => {
			button.addEventListener('dragenter', handleDragEnter);
			button.addEventListener('dragover', handleDragOver);
			button.addEventListener('dragleave', handleDragLeave);
			button.addEventListener('drop', handleDrop);
		});

		return () => {
			buttons.forEach(button => {
				button.removeEventListener('dragenter', handleDragEnter);
				button.removeEventListener('dragover', handleDragOver);
				button.removeEventListener('dragleave', handleDragLeave);
				button.removeEventListener('drop', handleDrop);
			});
		}
	}, [showNext, showPrev]);

	return (
		<StyledCalendar>
			<CalendarHeader>
				<h3>{monthNames[date.month][size] + " " + date.year}</h3>
				<button type="button" className="control" id="prev" onClick={showPrev}>&lt;</button>
				<button type="button" className="control" id="next" onClick={showNext}>&gt;</button>
			</CalendarHeader>
			<CalendarDaysOfWeek view={view}>
				{daysOfWeek.map((day, index) => (
					<div 
						key={index} 
						className={(view === "day" && index !== date.day) ? "hidden" : ""}
					>
						{day[size]}
					</div>
				))}
			</CalendarDaysOfWeek>
			<CalendarDates view={view}>
				{monthData.dates?.map((week, weekIdx) => {
					return (
						week.map((day, dayIdx) => (
							<CalendarDay
								key={`${weekIdx}-${dayIdx}`}
								dayNumber={day.dayNumber}
								ISODate={day.ISODate}
								date={day.date}
								events={events.filter(evt => evt.date.getMonth() === day.date.getMonth() && evt.date.getDate() === day.date.getDate())}
								inCurrentMonth={monthData.days[weekIdx][dayIdx] > 0}
								outOfView={(view === "week" && weekIdx !== date.week) || (view === "day" && !(weekIdx === date.week && dayIdx === date.day))}
								selected={day.ISODate === selectedDate.toISOString()}
								onClick={onDayClick}
								eventRender={eventRender}
								eventContainerClass={eventContainerClass}
							/>
						))
					)
				})}
			</CalendarDates>
		</StyledCalendar>
	)
}

function CalendarDay({
	dayNumber,
	ISODate,
	date,
	inCurrentMonth,
	outOfView,
	selected,
	onClick,
	events,
	eventRender,
	eventContainerClass
}) {
	return (
		<StyledCalendarDay className={`calendar-day ${inCurrentMonth ? 'current-month' : ""} ${outOfView ? 'hidden' : ""} ${selected ? "selected" : ""}`} id={ISODate} onClick={e => onClick(e.currentTarget.id)}>
			<time dateTime={ISODate} date={date} />
			<span className='day-number'>{dayNumber}</span>
			<div className={`events-container ${eventContainerClass}`}>
				{events.map(event => eventRender && <div className='calendar-event' key={event.id} id={event.id} draggable='true'>{eventRender(event)}</div>)}
			</div>
		</StyledCalendarDay>
	)

}

const StyledCalendarDay = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	border: none;
	border-radius: 0.5rem;
	background-color: #eee;
	min-width: 30px;

	&.current-month {
		background-color: #ffe;
	}
	
	&.current-month:hover {
		background-color: #ccc;
	}

	&.drag-on {
		outline: 2px solid black;
	}

	&.hidden {
		display: none;
	}

	&.selected {
		outline: 1px solid blue;
	}

	.day-number {
		font-weight: 200;
		padding-right: 0.25rem;
		pointer-events: none;
	}

	&.current-month .day-number {
		font-weight: bold;
	}

	.events-container {
		overflow-y: scroll;
		width: 100%;
		> div {
			border: 1px solid black;
			border-radius: 5px;
			
			:hover {
				cursor: pointer;
			}
		}

	}
`

const StyledCalendar = styled.div`
	display: flex;
	flex-direction: column;

	border: 1px solid black;
	border-radius: 0.5rem;
	margin: 0 auto;
	min-height: 12rem;
	user-select: none;
`

const CalendarHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 0.25rem auto;
	padding-bottom: 0.25rem;
	width: 100%;
	border-bottom: 1px solid black;

	> h3 {
		order: 1;
	}
	
	button {
		border: 1px solid black;
		border-radius: 5px;
		padding: 0 1rem;
		margin: 0 0.5rem;

	}
	button.drag-on {
		outline: 2px solid black;
	}

	> button:last-child {
		order: 2;
	}

`

const CalendarDaysOfWeek = styled.div`
	display: grid;
	grid-template-columns: ${({ view }) => (view === "day" ? "1fr" : "repeat(7, 1fr)")};
	min-height: 2rem;

	> div.hidden {
		display: none;
	}
`

const CalendarDates = styled.div`
	display: grid;
	grid-template-columns: ${({ view }) => (view === "day" ? "1fr" : "repeat(7, 1fr)")};
	column-gap: 2px;
	row-gap: 2px;
	min-height: 2rem;

	${StyledCalendarDay} {
		height: ${({ view }) => (view === "month" ? '5rem' : '20rem')};
	}
`

export default Calendar;