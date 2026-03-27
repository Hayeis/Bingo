import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ tasks = [] }) {
    const [allTasks, setAllTasks] = useState(tasks);
    const [displayedTasks, setDisplayedTasks] = useState(tasks);
    const [activeFilter, setActiveFilter] = useState('all'); // Track active button

    const showAll = () => {
        setDisplayedTasks(allTasks);
        setActiveFilter('all');
    };

    const sortByPriority = () => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const sorted = [...allTasks].sort(
            (a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        );
        setDisplayedTasks(sorted);
        setActiveFilter('priority');
    };

    const sortByDueDate = () => {
        const sorted = [...allTasks].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        setDisplayedTasks(sorted);
        setActiveFilter('dueDate');
    };

    // Button style helper
    const buttonClass = (filterName) =>
        activeFilter === filterName
            ? 'bg-green-700 text-white px-4 py-2 rounded-full'
            : 'bg-gray-200 px-4 py-2 rounded-full';

    return (
        <>
            <Head title="Tasks" />
            <div className="min-h-screen bg-green-200 relative">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-4 relative">
                    <Link
                        href={route('dashboard')}
                        className="absolute left-4 top-4 bg-gray-300 px-3 py-2 rounded-full flex items-center justify-center shadow"
                    >
                        ← Back
                    </Link>

                    <h1 className="mx-auto text-2xl font-bold text-red-600">
                        TASK PAGE
                    </h1>
                    <div className="w-16"></div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center p-4 mt-4">
                    <div className="flex gap-4">
                        <span>🪙 1,250</span>
                        <span>⭐ 12</span>
                        <span>🔥 15</span>
                    </div>
                    <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full" />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 px-4 mt-2">
                    <Link
                        href={route('calendar.index')}
                        className="bg-gray-200 px-4 py-2 rounded-full flex items-center justify-center"
                    >
                        <span className="text-xl">📅</span>
                    </Link>

                    <button onClick={showAll} className={buttonClass('all')}>
                        All
                    </button>

                    <button onClick={sortByPriority} className={buttonClass('priority')}>
                        Priority
                    </button>

                    <button onClick={sortByDueDate} className={buttonClass('dueDate')}>
                        Due Date
                    </button>
                </div>

                {/* Task Cards */}
                <div className="mt-4">
                    {displayedTasks.length === 0 && (
                        <p className="text-center mt-10 text-gray-500">
                            No tasks yet 👀
                        </p>
                    )}

                    {displayedTasks.map(task => (
                        <div key={task.id} className="m-4 bg-white rounded-2xl p-4 shadow">
                            <h2 className="text-xl font-bold">{task.title}</h2>
                            <p>{task.description}</p>
                            <div className="flex justify-between mt-3 items-center">
                                <div>
                                    <p>⏱ {task.time || '0:00:00'}</p>
                                    <p>📅 {new Date(task.date).toLocaleDateString()}</p>
                                    <p
                                        className="inline-block mt-1 px-2 py-1 rounded-full text-white text-xs font-semibold"
                                        style={{
                                            background:
                                                task.priority === 'high'
                                                    ? '#d9534f'
                                                    : task.priority === 'medium'
                                                    ? '#f0ad4e'
                                                    : '#5cb85c',
                                        }}
                                    >
                                        {task.priority?.toUpperCase() || 'LOW'}
                                    </p>
                                </div>
                                <button className="border border-black px-4 rounded-full h-fit">
                                    Start
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floating Button */}
                <Link
                    href={route('tasks.create')}
                    className="fixed bottom-6 right-6 bg-green-700 text-white w-14 h-14 flex items-center justify-center rounded-full text-3xl shadow-lg"
                >
                    +
                </Link>
            </div>
        </>
    );
}