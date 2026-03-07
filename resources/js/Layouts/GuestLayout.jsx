import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        //container halaman utama
        <div className="flex min-h-screen flex-col items-center bg-[#EDF4ED]/20">
            {/* Navigasi */}
            <header className="w-full px-6 py-4">
                <nav className="flex items-center justify-between">
                    {/* tombol back */}
                    <Link href="/">
                        <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6667 19.1475L10.6667 12.765L18.6667 6.38251L20.5334 7.87176L14.4 12.765L20.5334 17.6583L18.6667 19.1475Z" fill="#1D1B20"/>
                        </svg>
                    </Link>
                    {/* button humberger */}
                    <button>
                        <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29 19.5273C30.6569 19.5273 32 20.8705 32 22.5273C32 24.1842 30.6569 25.5273 29 25.5273H3C1.34315 25.5273 0 24.1842 0 22.5273C0 20.8705 1.34315 19.5273 3 19.5273H29ZM29 9.76367C30.6569 9.76367 32 11.1068 32 12.7637C31.9999 14.4205 30.6568 15.7637 29 15.7637H3C1.3432 15.7637 8.34923e-05 14.4205 0 12.7637C0 11.1068 1.34315 9.76367 3 9.76367H29ZM29 0C30.6569 0 32 1.34315 32 3C31.9998 4.65671 30.6568 6 29 6H3C1.34325 6 0.000166978 4.65671 0 3C0 1.34315 1.34315 0 3 0H29Z" fill="#301014"/>
                        </svg>
                    </button>
                </nav>
            </header>
            <div className="mt-6 w-full px-6 py-4 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
