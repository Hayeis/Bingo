import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Guest from 'vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/Layouts/GuestLayout';

export default function SetupUsername() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Mengirim data ke rute backend di UsernameSetupController
        post(route('username.store'));
    };
    return
    <GuestLayout>
        <Head title="Setup Username" />
    </GuestLayout>
}