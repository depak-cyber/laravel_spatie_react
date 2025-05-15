import {React,useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { create } from 'lodash';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import  TextAreaInput  from '@/Components/TextAreaInput';
import  TextInput  from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';


export default function Edit(props) {
    //console.log(props.feature);
    const {data,
        setData,
        processing,
        errors,
        put
    } = useForm({
        name: props.feature.name,
        description: props.feature.description,
    });
    const updateFeatures =(e)=>{
        e.preventDefault();
        put(route('feature.update', props.feature.id),{
            preserveScroll: true,
        })
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Update
            <b>: "{props.feature.name}"</b>
            </h2>}
        >
            <Head title='Update' />
            <div className="mb-4 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                <form onSubmit={updateFeatures} className="w-full">
                     <div className="mb-4">
                        <Link href={route('feature.index')} className="">
                            Back
                        </Link>
                     </div>
                   <div className="mb-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                   </div>
                   
                   <div className="mb-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextAreaInput
                        name="description"
                        rows={6}
                        value={data.description}
                        className="w-full mt-1"
                        handleChange={(e) => setData('description', e.target.value)}
                        autoComplete="description"
                        
                    />
                    <InputError message={errors.description} className="mt-2" />
                   </div>
                   <div className='flex items-center gap-4'>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                   </div>
                </form>

                </div>
            </div>
    </AuthenticatedLayout>
    );
}
