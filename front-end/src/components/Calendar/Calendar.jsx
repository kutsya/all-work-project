import './Calendar.css';
import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Title } from 'react-admin';
import ReceivedMessage from '../../pages/Dialogue/ReceivedMessage/ReceivedMessage';

const localizer = momentLocalizer(moment);

const events = [
    {
        title: 'Meeting',
        start: new Date(),
        end: new Date(moment().add(1, 'hours').toDate()),
    },
    {
        title: 'Conference',
        start: new Date(2024, 9, 10, 10, 0, 0),
        end: new Date(2024, 9, 10, 12, 30, 0),
    },
];

export const Calendar = () => {
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

    useEffect(() => {
        const role = sessionStorage.getItem('role');
        if (role && role !== 'admin') {
            sessionStorage.setItem('open_dialogue_user', role);
        }
    }, []);

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.start && newEvent.end) {
            events.push({
                title: newEvent.title,
                start: new Date(newEvent.start),
                end: new Date(newEvent.end),
            });
            setNewEvent({ title: '', start: '', end: '' });
        }
    };

    return (
        <div className='caledar'>
            <Title title="Calendar" />
            <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />
            <input
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />
            <button className="button-calendar" onClick={handleAddEvent}>Add Event</button>

            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 620, width: '100%' }}
            />
            <ReceivedMessage />
        </div>
    );
};
