
import React from 'react'
import './Home.css';
import ListaPostagens from './../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';





//{} dentro do react é uma variavel 


//const Home = () => {} :  forma de definir um componente funcional em React 
//componentes funcionais são funções JavaScript que retornam elementos React.



function Home() {
    return (
        <>
      

        <div className="bg-white flex justify-center body">
          <div className='container grid grid-cols-2 text-color '>
            
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-9xl font-light '>ON THE</h2>
              <p className='text-5xl'>with Sara</p>
              <h1 className='uppercase text-9xl'>BLOG</h1>
              <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>
              
              <div className="flex justify-around gap-4">
              <ModalPostagem />
              
                <button className='rounded color-button py-2 px-4'>Ver postagens</button>
              </div>
            </div>
            
  
            
          </div>
        </div>
        <div className='h2-home w-full py-7'>
              <h2 className='text-4xl text-center font-light '>O que vc verá por aqui </h2></div>

              <div className='carrocel flex '>
                <div className='image1'>
                <img src="/../src/assets/prato.png" alt="" />
                </div>

                <div >
                <img src="/../src/assets/livro.png" alt="" />
                </div>
                <div >
                <img src="/../src/assets/academia.png" alt="" />
                </div>

                <div >
                <img src="/../src/assets/dev.png" alt="" />
                </div>
              
              </div>

              <div>
                <img src="../../assets/home2.png" alt="" /></div>
              
                <ListaPostagens />
      </>
    );
}

export default Home;