import React, { useState, useEffect } from 'react';

export default function Calendar({ tasks }) {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 = Jan
    const [selectedDay, setSelectedDay] = useState(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [panelTasks, setPanelTasks] = useState([]);
    const [monthTasks, setMonthTasks] = useState({});

    const monthNames = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    // Get number of days in the current month/year
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const selectDate = async (day) => {
        setSelectedDay(day);
        const monthStr = String(currentMonth + 1).padStart(2, '0');
        const date = `${currentYear}-${monthStr}-${String(day).padStart(2, '0')}`;

        const res = await fetch(`/tasks?date=${date}`);
        const data = await res.json();
        setPanelTasks(data);
        setPanelOpen(true);
    };

    const closePanel = () => setPanelOpen(false);

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDay(null);
        setPanelOpen(false);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDay(null);
        setPanelOpen(false);
    };

    useEffect(() => {
        const fetchMonthTasks = async () => {
            const monthStr = String(currentMonth + 1).padStart(2, '0');
            const res = await fetch(`/tasks?month=${currentYear}-${monthStr}`);
            const data = await res.json();

            // Group tasks by day
            const grouped = {};
            data.forEach(task => {
                const day = new Date(task.date).getDate();
                if (!grouped[day]) grouped[day] = [];
                grouped[day].push(task);
            });

            setMonthTasks(grouped);
        };

        fetchMonthTasks();
    }, [currentMonth, currentYear]);

    return (
        <div
        className="calendar-page"
        style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            fontFamily: 'Segoe UI',
            background: '#dfe5df',
            padding: 20,
            boxSizing: 'border-box',
            overflow: 'hidden',
        }}
        >
        {/* Back Button - Fixed at top-left */}
        <button
            onClick={() => window.location.href = '/tasks/list'}
            style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '8px 14px',
            border: 'none',
            borderRadius: 8,
            background: '#6b3f2b',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1000,
            fontWeight: 'bold'
            }}
        >
            ← Back
        </button>

        {/* Page Title */}
        <h2 style={{ textAlign: 'center', letterSpacing: 4, marginTop: 0 }}>SELECT DATE</h2>

        {/* Month Navigation */}
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
            <button onClick={prevMonth}>◀</button>
            <strong>{monthNames[currentMonth]} {currentYear}</strong>
            <button onClick={nextMonth}>▶</button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, marginTop: 20 }}>
            {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return (
                <div
                key={day}
                className={`day ${selectedDay === day ? 'selected' : ''}`}
                style={{
                    textAlign: 'center',
                    padding: 12,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    background: selectedDay === day ? 'white' : '#f5f5f5',
                    border: selectedDay === day ? '2px solid green' : 'none',
                    transition: '0.2s',
                    position: 'relative'
                }}
                onClick={() => selectDate(day)}
                >
                {day}
                {monthTasks[day] && monthTasks[day].length > 0 && (
                    <span
                    style={{
                        display: 'inline-block',
                        background: '#6b3f2b',
                        color: 'white',
                        fontSize: 10,
                        borderRadius: '50%',
                        width: 18,
                        height: 18,
                        lineHeight: '18px',
                        textAlign: 'center',
                        position: 'absolute',
                        top: -5,
                        right: -5
                    }}
                    >
                    {monthTasks[day].length}
                    </span>
                )}
                </div>
            );
            })}
        </div>

        {/* Task Panel */}
        <div
            className="task-panel"
            style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#eee',
            borderRadius: '20px 20px 0 0',
            padding: 20,
            boxShadow: '0 -4px 10px rgba(0,0,0,0.2)',
            transform: panelOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
            maxHeight: '60vh',
            overflowY: 'auto'
            }}
        >
            <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
            <span>{selectedDay ? `Tasks for ${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}` : ''}</span>
            <button onClick={closePanel}>✖</button>
            </div>
                <div id="taskList">
                {panelTasks.length === 0 ? (
                    <p>No tasks</p>
                ) : (
                    panelTasks.map(task => (
                    <div
                        key={task.id}
                        className="card"
                        style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'white',
                        padding: 12,
                        borderRadius: 12,
                        marginBottom: 10
                        }}
                    >
                        <div style={{ flex: 1 }}>
                        <strong>{task.title}</strong>

                        {/* Timer and Priority in one line */}
                        <div style={{ marginTop: 5, display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#555' }}>⏱ {task.time || '0:00:00'}</span>
                            <span 
                            style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: 6,
                                color: 'white',
                                background: task.priority === 'high' ? '#d9534f' :
                                            task.priority === 'medium' ? '#f0ad4e' :
                                            '#5cb85c'
                            }}
                            >
                            {task.priority ? task.priority.toUpperCase() : 'LOW'}
                            </span>
                        </div>

                        {/* Tag */}
                        <span
                            className={`tag ${task.tag}`}
                            style={{
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 10,
                            color: 'white',
                            background: task.tag === 'urgent' ? '#d9534f' :
                                        task.tag === 'fun' ? '#5cb85c' : '#777',
                            marginTop: 5,
                            display: 'inline-block'
                            }}
                        >
                            {task.tag}
                        </span>
                        </div>

                        {/* Start Button */}
                        <button
                        style={{
                            marginLeft: 10,
                            padding: '6px 12px',
                            border: 'none',
                            borderRadius: 8,
                            background: '#5cb85c',
                            color: 'white',
                            cursor: 'pointer',
                            height: 'fit-content'
                        }}
                        >
                        Start
                        </button>
                    </div>
                    ))
                )}
                </div>
        </div>
        </div>
    );
}