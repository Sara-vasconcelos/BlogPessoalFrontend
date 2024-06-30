
import React from 'react'
import './Home.css';
import imageHome from '../../assets/homeImage2.avif'


//{} dentro do react é uma variavel 


//const Home = () => {} :  forma de definir um componente funcional em React 
//componentes funcionais são funções JavaScript que retornam elementos React.



function Home() {
    return (
        <>
      

        <div className="bg-white flex justify-center ">
          <div className='container grid grid-cols-2 text-color '>
            
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold '>Seja bem vinde!</h2>
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