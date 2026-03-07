import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout> 
            <Head title="Log in" />
            
            {/* Main - LOGIN */}
            <h1 className="font-pixel text-[40px] text-[#301014] tracking-[10%]
                           drop-shadow-[1px_0_0_#000] pl-5">LOG IN</h1>
            <p className="font-formal text-[14px] pl-6 pt-2 px-1 tracking-[10%]">Enter your email and password to log in</p>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="relative mt-7 ml-5">
                    <InputLabel htmlFor="email" value="Email" className="font-formal tracking-[6%]" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-[#D9D9D9] !rounded-[10px]"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {/* icon mail */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/3 mt-2 mr-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6667 3.99996C14.6667 3.26663 14.0667 2.66663 13.3334 2.66663H2.66671C1.93337 2.66663 1.33337 3.26663 1.33337 3.99996M14.6667 3.99996V12C14.6667 12.7333 14.0667 13.3333 13.3334 13.3333H2.66671C1.93337 13.3333 1.33337 12.7333 1.33337 12V3.99996M14.6667 3.99996L8.00004 8.66663L1.33337 3.99996" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="relative mt-3 ml-5 pt-3">
                    <InputLabel htmlFor="password" value="Password"/>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-[#D9D9D9] !rounded-[10px]"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {/* icon password */}
                    <div className="absolute right-3 top-1/2 translate-y-1/2 mt-1 mr-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_52_171)">
                                <path d="M11.96 11.96C10.8204 12.8286 9.4327 13.3099 7.99996 13.3333C3.33329 13.3333 0.666626 7.99996 0.666626 7.99996C1.49589 6.45456 2.64605 5.10436 4.03996 4.03996M6.59996 2.82663C7.05885 2.71921 7.52867 2.66552 7.99996 2.66663C12.6666 2.66663 15.3333 7.99996 15.3333 7.99996C14.9286 8.75703 14.446 9.46978 13.8933 10.1266M9.41329 9.41329C9.23019 9.60979 9.00939 9.7674 8.76406 9.87671C8.51873 9.98602 8.25389 10.0448 7.98535 10.0495C7.71681 10.0543 7.45007 10.0049 7.20103 9.90429C6.952 9.8037 6.72577 9.65398 6.53586 9.46406C6.34594 9.27414 6.19622 9.04792 6.09563 8.79889C5.99504 8.54985 5.94564 8.28311 5.95038 8.01457C5.95512 7.74602 6.0139 7.48119 6.12321 7.23586C6.23252 6.99053 6.39013 6.76972 6.58663 6.58663M0.666626 0.666626L15.3333 15.3333" stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_52_171">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                         </svg>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="flex justify-between item-center mt-5 ml-6">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm font-formal tracking-[10%]">
                            Remember me
                        </span>

                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-[#79B791]
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                        focus:ring-offset-2 font-formal tracking-[10%] hover:underline hover:text-blue-800"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
                    

                <div className="mt-8 flex items-center justify-end">
                    <PrimaryButton className="w-full ml-5 rounded-[13px] font-pixel_2 h-[42px] 
                                           !bg-[#51291E] hover:!bg-[#501a21] justify-center text-[22px]" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                {/* garis */}
                <div className="relative flex py-3 items-center w-[332px] mx-auto">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400 font-formal text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
               {/* Login with google */}
            <div className="w-full flex justify-center mt-3 ml-2">
                <a 
                    href="/auth/google/redirect" 
                    className="flex items-center justify-center w-full border-2 border-black rounded-full h-[52px] relative bg-[#AAD1B4] hover:bg-[#99C2A4] transition-all"
                >
                    {/* Ikon Google */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <svg className="w-7 h-7" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                        </svg>
                    </div>

                    {/* Teks */}
                    <span className="font-formal text-[14px] font-bold text-black tracking-wide">
                        Continue with Google
                    </span>
                </a>
            </div>
                {/* href to created account */}
                <div className="flex relative item-center justify-center mt-3">
                    <span>Don't have an account? <Link href={route('register')} className="text-[#79B791] hover:text-blue-800 hover:underline font-formal">Register Here</Link></span>
                </div>
            </form>
        </GuestLayout>
    );
}
