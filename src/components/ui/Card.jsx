import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

export const Card = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={twMerge('rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800', className)}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardHeader = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={twMerge('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardTitle = ({ 
  children, 
  className = '' 
}) => {
  return (
    <h3 className={twMerge('text-lg font-medium leading-6 text-gray-900 dark:text-white', className)}>
      {children}
    </h3>
  );
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardDescription = ({ 
  children, 
  className = '' 
}) => {
  return (
    <p className={twMerge('mt-1 text-sm text-gray-500 dark:text-gray-400', className)}>
      {children}
    </p>
  );
};

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardContent = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={twMerge('px-6 py-4', className)}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const CardFooter = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={twMerge('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
