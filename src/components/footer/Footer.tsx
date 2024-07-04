
import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { AuthContext } from '../../contexts/AuthContext'
import React, { useContext } from 'react'
import './Footer.css'


function Footer() {
  const { usuario, handleLogout } = useContext(AuthContext)

  let footerComponent

  let data = new Date().getFullYear()

  if(usuario.token !== ''){
    footerComponent =(
      <>

      <div className="flex justify-center  text-white footer">
      <div className="container flex flex-col items-center py-4">
        <p className='text-xl font-light'> OnTheBlog | Copyright: Sara Vasconcelos </p>
        <p className='text-lg'>Acesse nossas redes sociais</p>
        <div className='flex gap-2'>
          <LinkedinLogo size={48} weight='light' />
          <InstagramLogo size={48} weight='light' />
          <FacebookLogo size={48} weight='light' />
        </div>
      </div>
    </div>
    </>
    )
  }


  return (
    <>
    {footerComponent}
  </>
  )
}

export default Footer