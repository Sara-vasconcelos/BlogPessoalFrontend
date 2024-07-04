import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './NavBar.css'
import { toastAlerta } from '../../util/toastAlerta'



function Navbar() {
    const navigate = useNavigate() //UseNavigate :  é um hook que permite navegar programaticamente entre as rotas

//perguntar para o thiago sobre isso
    //useContext: hook do React que permite acessar valores de um contexto fornecido por um Context.Provider.
    //AuthContext é o contexto de autenticação que foi criado na context usando React.createContext e AuthContext.Provider.
    //{ usuario, handleLogout } é uma forma de desestruturação do objeto.
    const { usuario, handleLogout } = useContext(AuthContext) 
    
//e a função logout que é chamada quando o usuário clica no link de "Sair".
    function logout() { 
        handleLogout() 
        toastAlerta('Usuário deslogado com sucesso','sucesso')
        navigate('/login')
    }

    let navbarComponent



    if(usuario.token !== ""){
        navbarComponent = (

            <div className='w-full color-navbar text-white flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-light '>OnTheBLOG</Link>

                    <div className='flex gap-12 font-light'>
                    <Link to='/postagens' className='hover:underline'>Postagens</Link>
                        <Link to='/temas' className='hover:underline'>Temas</Link> {/* se o usuário clicar será redirecionado para a página especificada*/}
                        <Link to='/cadastroTema' className='hover:underline'>Cadastrar tema</Link>  {/*experiência de navegação mais rápida e fluida para os usuários*/ }
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                      <Link to='' onClick={logout} className='hover:underline'>Sair</Link>{/*vai chamar a função logout quando clicar em sair */}

                    

                    </div>
                </div>
            </div>

        )
    }


    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar