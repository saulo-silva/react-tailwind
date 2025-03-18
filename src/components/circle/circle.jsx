import PropTypes from 'prop-types';

const Circle = ({ status, onClick }) => {
  const getColor = () => {
    switch (status) {
      case 'current':
        return {
          bg: 'bg-primary-500',
          border: 'border border-primary-500',
        };
      case 'completed':
        return {
          bg: 'bg-primary-500',
          border: '',
        };
      case 'awaiting':
      default:
        return {
          bg: 'bg-gray-300',
          border: '',
        };
    }
  };

  return (
    <div
      role="button"
      tabIndex="0"
      aria-label="Passos"
      onClick={onClick ? onClick : undefined}
      className={`relative inset-0 size-4 cursor-pointer rounded-full ${getColor().border}`}
    >
      <div className={`absolute inset-1 rounded-full ${getColor().bg}`} />
    </div>
  );
};

Circle.propTypes = {
  status: PropTypes.oneOf(['current', 'completed', 'awaiting']),
  onClick: PropTypes.func,
};

export default Circle;
