import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Radio from '@/Components/Radio';



export default function Edit({user, roles = [], auth, roleLabels}) {
    // console.log(roles)

  const {
    data,
    setData,
    processing,
    errors,
    put
  } = useForm({
    name: user.name,
    email: user.email,
    roles: user.roles,
    roleLabels: roleLabels,
  })

  const updateUser = (ev) => {
    ev.preventDefault();

    put(route('user.update', user.id), {
      preserveScroll: true
    })
  }

  const onRoleChange = (ev) => {
    console.log(ev.target.value, ev.target.checked)
    if (ev.target.checked) {
      setData('roles', [ev.target.value])
    }
  }


  return (
    
    <AuthenticatedLayout
        auth={user}
        errors={user.errors}
        user={user}
        success={user.success}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User <b>"{user.name}"</b>
        </h2>
      }
    >
      <Head title={'Edit User ' + user.name}/>
      
      <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
        <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
          <form onSubmit={updateUser} className="w-full">
            <div className="mb-8">
              <InputLabel htmlFor="name" value="Name"/>

              <TextInput
                id="name"
                disabled
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name}/>
            </div>

            <div className="mb-8">
              <InputLabel htmlFor="email" value="Email"/>

              <TextInput
                id="email"
                disabled
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
              />

              <InputError className="mt-2" message={errors.email}/>
            </div>

           {/* <pre>{JSON.stringify(data, undefined, 2)}</pre> */}
            <div className="mb-8">
                <h3 className='font-bold mb-1'>Role</h3>
               {roles.map((role) => (
                     <label key={role.id} className="flex items-center">
                            <Radio
                                name="roles"
                                checked={data.roles?.includes(role.name)}
                                value={role.name}
                                onChange={onRoleChange}
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                {roleLabels[role.name]}
                            </span>
                        </label>
                    ))}
                </div>

          

            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}