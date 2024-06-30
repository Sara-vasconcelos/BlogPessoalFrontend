
import React from 'react';
import './App.css';

import Navbar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';//biblioteca de roteamento para aplicativos React
                                                              //Ele permite que você gerencie a navegação de uma página para outra sem atualizar a página inteira.
import Login from './paginas/login/Login';
import Cadastro from './paginas/cadastro/Cadastro';
import Home from './paginas/home/Home';
import { AuthProvider } from './contexts/AuthContext';
import ListaTemas from './components/temas/ListaTemas/ListaTemas';
import FormularioTema from './components/temas/formularioTema/FormularioTema';
import DeletarTema from './components/temas/deletarTema/DeletarTema';

//App() é o componente principal do aplicativo e retorna o conteúdo que será renderizado na página.
function App() {
  return (
    <>
    <AuthProvider>
       <BrowserRouter>{/* BrowserRouter :é usado para envolver todo o conteúdo que precisa de roteamento. */}
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>   {/* Routes: é usado para definir as rotas do aplicativo. */}
              <Route path="/" element={<Login />} /> {/* Route: define uma rota | path: caminho da rota e "/" representa a pagina inicial|Element: elemento que será renderizado */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;