import Dropdown from "@/Components/Dropdown";
import { Link } from "@inertiajs/react";
import { can, hasRole } from '@/helper';
import { usePage } from "@inertiajs/react";


export default function FeatureActionsDropdown({ feature }) {
    const user = usePage().props.auth.user;

    if(!can(user, 'manage_features')){
        return;
    }
    return(
       <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                   <button 
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                     
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd"
                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                            clipRule="evenodd"/>
                        </svg>
                    </button>
                </span>
            </Dropdown.Trigger>

            <Dropdown.Content>
               
                { hasRole(user,'admin')&&
                <Dropdown.Link
                href={route('feature.edit', feature.id)}
                >
                Edit
                </Dropdown.Link>}

                { hasRole(user,'admin')&&
                <Dropdown.Link
                href={route('feature.destroy', feature.id)}
                method="delete"
                as="button"
                >
                Delete
                </Dropdown.Link>}
            </Dropdown.Content>
        </Dropdown>
    )
    
}