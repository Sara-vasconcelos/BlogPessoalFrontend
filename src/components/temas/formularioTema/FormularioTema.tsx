import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormularioTema() {
  //Declara um estado local tema com tipo Tema, inicializando-o como um objeto vazio.
  const [tema, setTema] = useState<Tema>({} as Tema);

  const navigate = useNavigate();
//Usa o hook useParams para extrair o parâmetro id da URL, identificando se estamos criando ou editando um tema.
  const { id } = useParams<{ id: string }>();
//Usa o hook useContext para acessar o contexto de autenticação, obtendo o usuário logado e a função de logout.
  const { usuario, handleLogout } = useContext(AuthContext);

 // Extrai o token do usuário logado para usá-lo em requisições HTTP.
  const token = usuario.token;
// obter os dados do tema pelo ID e armazena-os no estado tema, passando o token de autorização nos headers.
  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }
//buscar os dados do tema se o id estiver definido
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])
//Define a função para atualizar o estado tema com os valores dos campos do formulário.
//Atualiza o estado tema, copiando os valores existentes e substituindo o valor do campo correspondente.
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value
    })
//Imprime o estado tema atualizado no console para depuração.
    console.log(JSON.stringify(tema))//PERGUNTAR
  }
//: Define uma função assíncrona para criar ou atualizar um tema.
//e.preventDefault() :previne o comportamento padrão do formulário ao ser enviado.
  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault() //PERGUNTAR
//: Verifica se estamos editando um tema e se o id está definido).
    if (id !== undefined) {
      try {//Tenta atualizar o tema no backend e trata possíveis erros. Se a atualização for bem-sucedida, exibe um alerta e chama a função retornar
        await atualizar(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema atualizado com sucesso')
        retornar()
//: Trata erros específicos de token expirado ou outros erros gerais.
      } catch (error: any) {//é usada para especificar que o tipo do parâmetro error pode ser qualquer coisa. Isso significa que error pode ser um objeto, uma string, um número, ou qualquer outro tipo
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar o Tema')
        }

      }

    } else {//Caso contrário, estamos criando um novo tema.
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: {
            'Authorization': token
          }
        })

        alert('Tema cadastrado com sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrado o Tema')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/temas")
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {/*Mostra um título que muda dependendo se estamos criando ou editando um tema, pode ser
        Cadastre um novo tema ou editar tema */} 
        {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do tema</label>
          <input
            type="text"
            placeholder="Descrição"
            name='descricao'
            className="border-2 border-slate-700 rounded p-2"
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//caso ocorra um evento nesse input , ele executa a função atualizarEstado
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioTema;