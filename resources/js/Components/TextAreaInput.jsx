import { useRef, forwardRef } from 'react';

const TextAreaInput = forwardRef(({ 
    name,
    rows,
    value,
    className = '',
    required,
    isFocused,
    handleChange,
    placeholder,
    ...props 
}, ref) => {
    const textarea = ref ? ref : useRef();

    return (
        <div className="flex flex-col items-start">
            <textarea
                name={name}
                rows={rows || 6}
                value={value || ''}
                className={
                    `border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ` +
                    className
                }
                ref={textarea}
                required={required}
                onChange={(e) => handleChange && handleChange(e)}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
});

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;