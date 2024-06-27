
import React from 'react'
import './Home.css';
import imageHome from '../../assets/homeImage2.avif'


// dentro de parenteses ele está informando ao home que ele está recebendo props(propriedade)
//{} dentro do react é uma variavel 
//dentro dos () da function home , eu coloco qual é o tipo do props , e nesse caso eu coloco o nome que eu criei


//const Home = () => {} :  forma de definir um componente funcional em React 
//componentes funcionais são funções JavaScript que retornam elementos React.

//Dentro da função, estamos retornando JSX, que é a sintaxe de extensão do JavaScript usada pelo React para descrever o que a UI deve parecer

//Home é exportado como o padrão do módulo, para que possa ser importado e usado em outros lugares da aplicação.
/*const Home = () => {
    let navigate = useNavigate()

  return (
    

    <>
        <div className='text-center'>
            <h2 className="text-slate-900 text-5xl  m-4 text-center">Home</h2>
            <div>
                <button type='submit'
                    className='hover:underline mx-4'
                    onClick={() => { navigate('/login') }}>
                    Login useNavigate
                </button>
                <Link to='/login' className='hover:underline mx-4'>Login por Link</Link>
            </div>

        </div>
    
    
    </>

        
    
  );
}

export default Home*/


function Home() {
    return (
        <>
        <div className="bg-white flex justify-center ">
          <div className='container grid grid-cols-2 text-color'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Seja bem vinde!</h2>
              <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>
              
              <div className="flex justify-around gap-4">
              
                <button className='rounded color-button py-2 px-4'>Ver postagens</button>
              </div>
            </div>
  
            <div className="flex justify-center ">
            <img src={imageHome} alt="" className='w-2/3' />
            
              
      
            </div>
          </div>
        </div>
      
      </>
    );
}

export default Home;