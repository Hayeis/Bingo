import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState } from "react";

function Section({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-[#a9c3a9] rounded-2xl p-4 shadow mb-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center font-bold text-[#3b1f1f] text-lg"
            >
                {title}
                <span>{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <div className="mt-3 text-sm">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <>
            <Head title="Profile" />

            <div className="min-h-screen bg-[#7faa84] relative p-4">

                {/* BACK BUTTON */}
                <Link
                    href="/dashboard" // change this to wherever you want to go
                    className="absolute top-4 left-4 bg-gray-300 px-3 py-2 rounded-full flex items-center justify-center shadow z-10"
                >
                    ← Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >

                    {/* TOP BAR */}
                    <div className="flex justify-between bg-[#a9c3a9] rounded-2xl px-4 py-2 text-sm mb-5 shadow">
                        <span>🪙 1,250</span>
                        <span>⭐ 12</span>
                        <span>🔥 15</span>
                    </div>

                    {/* PROFILE */}
                    <div className="text-center mb-4">
                        <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto mb-3"></div>

                        <h2 className="text-2xl font-bold">{user.name} ✏️</h2>
                        <p className="italic text-sm">Rising Botanist</p>
                        <p className="text-xs mt-1">Level 12</p>
                    </div>

                    {/* XP BAR */}
                    <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#4b1e1e] h-2 rounded-full w-[60%]"></div>
                        </div>

                        <p className="text-xs mt-2">⭐ XP : 320 / 500</p>
                        <p className="text-xs">🪙 Coins : 1,250</p>
                    </div>

                    {/* STATS */}
                    <div className="bg-[#dfe6df] rounded-2xl p-4 text-sm mb-4">
                        <p>🎯 Task Completed : 87</p>
                        <p>⏱ Focus Time : 52h</p>
                        <p>🔥 Highest Streak : 20</p>
                    </div>

                    {/* ACCORDIONS */}
                    <Section title="🌱 PLANTS">
                        <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-white rounded-lg p-2">🌱</div>
                            <div className="bg-white rounded-lg p-2">🌵</div>
                            <div className="bg-white rounded-lg p-2">🌸</div>
                            <div className="bg-white rounded-lg p-2">🌳</div>
                        </div>
                    </Section>

                    <Section title="🏆 ACHIEVEMENTS">
                        <div className="flex gap-2">
                            <div className="bg-white px-3 py-1 rounded">🏆</div>
                            <div className="bg-gray-300 px-3 py-1 rounded opacity-50">🏆</div>
                        </div>
                    </Section>

                    <Link
                        href="/settings"
                        className="block w-full bg-[#a9c3a9] rounded-2xl p-4 shadow text-center font-bold text-[#3b1f1f] text-lg hover:scale-[1.02] transition"
                    >
                        ⚙️ SETTINGS
                    </Link>

                </motion.div>
            </div>
        </>
    );
}