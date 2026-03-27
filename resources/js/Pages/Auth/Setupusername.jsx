import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function SetupUsername() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('username.store'));
    };

    return (
        <GuestLayout>
            <Head title="Setup Username" />

            <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
                <InputLabel htmlFor="name" value="Enter your username" />
                <TextInput
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="mt-2 w-full"
                    autoFocus
                />
                <InputError message={errors.name} className="mt-2" />

                <PrimaryButton className="mt-4" processing={processing}>
                    Save
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}