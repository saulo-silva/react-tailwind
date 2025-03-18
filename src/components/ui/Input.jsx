import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const Input = forwardRef(({ 
  className,
  type = "text",
  error,
  label,
  id,
  ...props
}, ref) => {
  const baseClasses = 'w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400';
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={twMerge(baseClasses, errorClasses, className)}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
