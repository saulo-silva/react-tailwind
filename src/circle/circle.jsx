// import './styles.css'
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
    <div className='circle-container' onClick={onClick ? onClick : undefined}>
      <div className={`relative inset-0 size-4 cursor-pointer rounded-full ${getColor().border}`}>
        <div className={`absolute inset-1 rounded-full ${getColor().bg}`} />
      </div>
    </div>
  )
}

Circle.propTypes = {
  status: PropTypes.oneOf(['current', 'completed', 'awaiting']),
  onClick: PropTypes.func,
};

export default Circle
