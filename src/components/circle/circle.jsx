import PropTypes from 'prop-types';

const Circle = ({ status, onClick }) => {
  const getColor = () => {
    switch (status) {
      case 'current':
        return {
          bg: 'bg-blue-500',
          border: 'border border-blue-500',
        };
      case 'completed':
        return {
          bg: 'bg-blue-500',
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
      onClick={onClick ? onClick : undefined}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick();
        }
      }}
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
