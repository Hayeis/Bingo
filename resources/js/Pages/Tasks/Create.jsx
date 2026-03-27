import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post } = useForm({
        title: '',
        description: '',
        hours: '00',
        minutes: '00',
        seconds: '00',
        date: '',
        priority: '',
        days: [],
        repeat: '',
        reminder: '',
    });

    const daysList = [
        { label: 'M', value: 'mon' },
        { label: 'T', value: 'tue' },
        { label: 'W', value: 'wed' },
        { label: 'T', value: 'thu' },
        { label: 'F', value: 'fri' },
        { label: 'S', value: 'sat' },
        { label: 'S', value: 'sun' },
    ];

    const toggleDay = (day) => {
        if (data.days.includes(day)) {
            setData('days', data.days.filter(d => d !== day));
        } else {
            setData('days', [...data.days, day]);
        }
    };

    function submit(e) {
        e.preventDefault();

        const formattedTime =
            `${data.hours.padStart(2,'0')}:` +
            `${data.minutes.padStart(2,'0')}:` +
            `${data.seconds.padStart(2,'0')}`;

        // Put formatted time into form state
        setData('time', formattedTime);

        // Remove fields backend doesn't need
        post(route('tasks.store'), {
            data: {
                ...data,
                time: formattedTime
            },
            preserveScroll: true,
            onSuccess: () => {
                router.visit(route('tasks.index'));
            }
        });
    }
    
    return (
        <div className="min-h-screen bg-green-200 relative">
            <Head title="Create Task" />

            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="absolute top-4 left-4 text-2xl font-bold text-red-600"
            >
                &lt;
            </button>

            <h1 className="p-4 text-2xl font-bold text-red-600 text-center">
                CREATE TASK
            </h1>

            <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-4">

                {/* Task Name */}
                <input
                    type="text"
                    placeholder="Task Name"
                    className="w-full p-3 rounded-xl shadow"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                />

                {/* Notes */}
                <textarea
                    placeholder="Notes"
                    className="w-full p-3 rounded-xl shadow"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />

                {/* Focus Timer */}
                <div className="flex items-center justify-center gap-2 text-2xl font-mono">
                    
                    {/* Hours */}
                    <input
                        type="number"
                        min="0"
                        max="23"
                        className="w-16 text-center p-2 rounded-xl shadow"
                        value={data.hours}
                        onChange={e => setData('hours', e.target.value ? e.target.value.padStart(2,'0') : '00')}
                    />

                    <span>:</span>

                    {/* Minutes */}
                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-16 text-center p-2 rounded-xl shadow"
                        value={data.minutes}
                        onChange={e => setData('minutes', e.target.value ? e.target.value.padStart(2,'0') : '00')}
                    />

                    <span>:</span>

                    {/* Seconds */}
                    <input
                        type="number"
                        min="0"
                        max="59"
                        className="w-16 text-center p-2 rounded-xl shadow"
                        value={data.seconds}
                        onChange={e => setData('seconds', e.target.value ? e.target.value.padStart(2,'0') : '00')}
                    />
                </div>

                {/* Priority */}
                <div className="bg-green-200 p-4 rounded-xl shadow flex justify-around">
                    {['low', 'medium', 'high'].map((level) => (
                        <button
                            type="button"
                            key={level}
                            onClick={() => setData('priority', level)}
                            className={`px-4 py-2 rounded-lg ${
                                data.priority === level ? 'bg-green-500 text-white' : 'bg-white'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Due Date */}
                <div>
                    <input
                        type="date"
                        className="w-full p-3 rounded-xl shadow"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Select when this task should be completed
                    </p>
                </div>

                {/* Reminder */}
                <input
                    type="time"
                    className="w-full p-3 rounded-xl shadow"
                    value={data.reminder}
                    onChange={e => setData('reminder', e.target.value)}
                />

                {/* Repeat */}
                <select
                    className="w-full p-3 rounded-xl shadow"
                    value={data.repeat}
                    onChange={e => setData('repeat', e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>

                {/* Pick Days */}
                <div className="flex gap-2 justify-center">
                    {daysList.map((dayObj) => (
                        <button
                            type="button"
                            key={dayObj.value}
                            onClick={() => toggleDay(dayObj.value)}
                            className={`w-8 h-8 rounded-full ${
                                data.days.includes(dayObj.value)
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200'
                            }`}
                        >
                            {dayObj.label}
                        </button>
                    ))}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-400 p-3 rounded-xl shadow"
                >
                    CREATE
                </button>

            </form>
        </div>
    );
}