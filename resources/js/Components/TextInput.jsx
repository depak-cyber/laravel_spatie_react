import { useRef, forwardRef } from 'react';

const TextInput = forwardRef(({ 
    type = 'text',
    name,
    value,
    className = '',
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
    ...props 
}, ref) => {
    const input = ref ? ref : useRef();

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange && handleChange(e)}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;
