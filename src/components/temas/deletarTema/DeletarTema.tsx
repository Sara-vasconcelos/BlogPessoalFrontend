import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext'
import Tema from '../../../models/Tema'
import { buscar, deletar } from '../../../services/Service'

function DeletarTema() {
    // variável de estado 'tema' e sua função de atualização 'setTema', inicializando tema como um objeto vazio do tipo 'Tema.'
    const [tema, setTema] = useState<Tema>({} as Tema) //UseState
//variavel que usa o hook useNavigate para obter a função navigate, que permite navegação programática entre rotas.
    const navigate = useNavigate()
//Usa o hook useParams para extrair o parâmetro id da URL.
    const { id } = useParams<{ id: string }>()
//Usa o hook useContext para acessar o contexto AuthContext e desestruturar usuario e handleLogout.
    const { usuario, handleLogout } = useContext(AuthContext)
    //Extrai o token de autenticação do objeto usuario.
    const token = usuario.token
// função assincrona :Tenta fazer uma requisição para buscar um tema pelo seu id e atualizar o estado tema.
    async function buscarPorId(id: string) {
        try {//Usa a função buscar para enviar a requisição, passando o URL, a função de atualização de estado, e os headers com o token de autorização
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })//Se ocorrer um erro e ele contiver '403', alerta o usuário que o token expirou e chama handleLogout para deslogar o usuário.
        } catch (error: any) {//error: any : é usada para especificar que o tipo do parâmetro error pode ser qualquer coisa. Isso significa que error pode ser um objeto, uma string, um número, ou qualquer outro tipo
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }
//: Define um efeito colateral que verifica se o usuário está logado.
    useEffect(() => {
        if (token === '') {// Se o token estiver vazio, alerta o usuário que ele precisa estar logado e navega para a página de login.
            alert('Você precisa estar logado')
            navigate('/login')
        }
    }, [token])

    //Define um efeito colateral que executa buscarPorId quando o id é definido.

    useEffect(() => {//Se o id não for indefinido, chama buscarPorId com o id.
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    //: Define a função retornar que navega o usuário de volta para a página de temas.
    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {
        try {//Tenta deletar o tema pelo seu id.
            await deletar(`/temas/${id}`, {
                headers: {//Usa a função deletar para enviar a requisição, passando o URL e os headers com o token de autorização.
                    'Authorization': token
                }
            })
//Se a requisição for bem-sucedida, alerta o usuário que o tema foi apagado com sucesso.
            alert('Tema apagado com sucesso')
//Se ocorrer um erro, alerta o usuário que houve um erro ao apagar o tema
        } catch (error) {
            alert('Erro ao apagar o Tema')
        }

        retornar()//Chama a função retornar para navegar de volta para a página de temas.
    }
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar tema</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar o tema a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Tema</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>{/*Chama a função de retornar que navega o usuario para a página de temas  */}
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarTema}>{/*Chama a função deletarTema , que irá deletar o tema*/}
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema