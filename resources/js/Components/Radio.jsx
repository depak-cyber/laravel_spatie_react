export default function Radio({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="radio"
            className={
                'rounded-full border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ' +
                className
            }
        />
    );
}