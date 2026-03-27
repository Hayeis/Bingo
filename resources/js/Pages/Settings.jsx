import { Head, Link, router } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState } from "react";

export default function Settings() {
    const [language, setLanguage] = useState("English");
    const [emailNotif, setEmailNotif] = useState(true);

    function handleLogout() {
        router.post('/logout');
    }

    return (
        <>
            <Head title="Settings" />

            <div className="min-h-screen bg-[#7faa84] flex flex-col items-center p-4 relative">
                
                {/* Back Button */}
                <Link
                    href={route('my-profile')} 
                    className="absolute top-4 left-4 bg-gray-300 px-3 py-2 rounded-full flex items-center justify-center shadow"
                >
                    ← Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#7faa84] rounded-3xl p-6 shadow-xl text-[#3b1f1f] mt-16"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center">⚙️ Settings</h2>

                    {/* LANGUAGE */}
                    <div className="bg-[#a9c3a9] rounded-2xl p-4 mb-4">
                        <label className="block font-bold mb-2">🌐 Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full rounded-lg p-2"
                        >
                            <option>English</option>
                            <option>Bahasa Indonesia</option>
                        </select>
                    </div>

                    {/* EMAIL NOTIFICATION */}
                    <div className="bg-[#a9c3a9] rounded-2xl p-4 mb-4 flex justify-between items-center">
                        <span className="font-bold">📧 Email Notification</span>
                        <input
                            type="checkbox"
                            checked={emailNotif}
                            onChange={() => setEmailNotif(!emailNotif)}
                            className="w-5 h-5"
                        />
                    </div>

                    {/* CHANGE PASSWORD */}
                    <Link
                        href="/forgot-password"
                        className="block bg-[#a9c3a9] rounded-2xl p-4 mb-4 text-center font-bold hover:scale-[1.02] transition"
                    >
                        🔒 Change Password
                    </Link>

                    {/* LOG OUT */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-400 rounded-2xl p-4 text-center font-bold hover:scale-[1.02] transition"
                    >
                        🚪 Log Out
                    </button>
                </motion.div>
            </div>
        </>
    );
}