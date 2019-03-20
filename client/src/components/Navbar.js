import React from 'react'
import { Link } from 'react-router-dom'
import { containerStyle } from '../appStyle'

export default function Navbar () {
  return (
    <nav style={containerStyle} className='justify-between'>
      <div className='end' >
        <Link to='/' style={linkStyle}>Home </Link>
      </div>
      <div className='end' >
        <Link to='/about' style={linkStyle}>About</Link>
      </div>
    </nav>
  )
}

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}
