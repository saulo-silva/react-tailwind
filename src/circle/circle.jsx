import './styles.css'

const Circle = () => {
  return (
    <div className='circle-container'>
      <div className='circle-container__circle circle-container__circle--border'>
        <div className='circle-container__inner-circle circle-container__inner-circle--bg' />
      </div>
    </div>
  )
}

export default Circle
