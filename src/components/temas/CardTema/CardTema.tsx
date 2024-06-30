import React from 'react'
import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'


// Declara um tipo de objeto que será usado como as propriedades do componente CardTemas.
//tema: Tema: Define uma propriedade tema que é do tipo Tema. 
//Isso indica que qualquer objeto passado como tema deve seguir a estrutura definida pela interface Tema.
interface CardTemaProps {
  tema: Tema
}
//perguntar para o thiago
//({tema}: CardTemaProps):Usa desestruturação para extrair a propriedade tema do objeto CardTemaProps passado para o componente.
function CardTemas({tema}: CardTemaProps) {
  return (
    //Cria uma div que contém os links de edição e deleção do tema.
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
      <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>Tema</header>
      <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
      <div className="flex">
        {/* Define a rota de destino, incluindo o ID do tema */}
        <Link to={`/editarTema/${tema.id}`} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarTema/${tema.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardTemas