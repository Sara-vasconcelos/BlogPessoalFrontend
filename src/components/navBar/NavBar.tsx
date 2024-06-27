import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import './NavBar.css'


function Navbar() {
 
  

  return (
    <>
     <div className='w-full color-navbar  flex justify-center py-4 '>
          <div className="container flex justify-between text-lg">
            <div className='text-2xl font-bold uppercase'>Blog Pessoal</div>

            <div className='flex gap-4'>
              <Link to='/login' className='hover:border-b-[#245501] hover:border-b-2'>Login</Link>
              <Link to='/home' className='hover:border-b-[#245501] hover:border-b-2'>Home</Link>
              <div className='hover:border-b-[#245501] hover:border-b-2'>Postagens</div>
              <div className='hover:border-b-[#245501] hover:border-b-2'>Temas</div>
              <div className='hover:border-b-[#245501] hover:border-b-2'>Cadastrar tema</div>
              <div className='hover:border-b-[#245501] hover:border-b-2'>Perfil</div>
              <div className='hover:border-b-[#245501] hover:border-b-2'>Sair</div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar