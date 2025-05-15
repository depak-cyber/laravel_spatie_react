import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePoll } from '@inertiajs/react';
import { map } from 'lodash';
import FeatureItem from '@/Components/FeatureItem';
import { Link } from '@inertiajs/react';
import { can, hasRole } from '@/helper';



export default function Index({ auth, errors, features }) { 
   // usePoll(2000);
    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Features</h2>}
        >
            <Head title="Features" />
          {can(auth.user,'manage_features') &&<div className="mb-4">
                <Link href={route('feature.create')} className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">
                    Create Feature
                </Link>
            </div>
            }
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {features?.data?.map(feature => (
                                <div key={feature.id} className="mb-4">
                                    <FeatureItem feature={feature} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}