import React from 'react'
import Notes from './Notes'

const Home = (props) => {
  return (
    <div className='my-5'>
      <Notes toggleAlert={props.toggleAlert}/>
    </div>
  )
}

export default Home
