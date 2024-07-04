import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { toastAlerta } from '../../util/toastAlerta'



function Cadastro() {

  const navigate = useNavigate()//será usada para redirecionar o usuário para outras páginas.

  //  criamos um estado para poder pegar o valor do campo "confirmar senha", para comparar as senhas antes de enviar o cadastro

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  // armazenar os dados que o usuario digitou no form
  const [usuario, setUsuario] = useState<Usuario>({
    // iremos iniciar o objeto usuário, com todos os seus valores em branco
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
// criamos aqui um novo estado de usuário, para receber a resposta do backend e tratar ela de forma correta
//rmazenar a resposta do backend após o cadastro
  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({//Usuario é da model
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
    // criamos um useEffect, que irá verificar o id recebido no estado "usuarioResposta", 
    //e caso ele seja diferente de zero, que significa que o usuário foi cadastrado corretamente no servidor, iremos navegar ele para o login

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back()
    }
  }, [usuarioResposta])

  // função de navegação, que levara nosso usuário de volta para a tela de login

  function back() {
    navigate('/login')
  }
  // a função abaixo,  atualiza o estado confirmaSenha com o valor digitado no campo "Confirmar Senha".
  //e: significa evento
  //e: ChangeEvent<HTMLInputElement>: quando tiver um evento no input do html 

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }
  // a função atualizarEstado irá receber o evento de mudança dos inputs, e para cada novo caractere digitado, iremos atualizar o estado de usuario criado acima, atualizando o campo correto, de acordo com o atributo "name" da tag html

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,//esses tres pontinhos significa que ele mantem o que ja tem 
      [e.target.name]: e.target.value//acrescenta o que foi digito depois no value 
    })
  }
  // a função "cadastrarNovoUsuario" será responsavel por entender que o formulário está sendo enviado, e fazer a comunicação com o nosso backend

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    // depois de prevenir a atualização, iremos fazer uma validação dos campos de senha

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {//verifica se o campo senha , e confirmar senha são iguais , e se a senha é maior ou igual a 8 caracteres
      // depois, iremos tentar cadastrar o usuário no backend, e caso tudo de certo, encerramos o código dentro do TRY

      try {
                // iremos aguardar a Promisse do Axios, de que ele levará nossos dados ao servidor, e se tudo der certo, damos o alerta e fim.

        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

      } catch (error) {
                // caso de algum erro no cadastro que tentamos no TRY, a parte do Catch irá reconhecer isso, e dar um alerta diferente para o nosso usuário

                toastAlerta('Erro ao cadastrar o Usuário','erro')
      }
//senhas não coincidem ou a senha não tiver pelo menos 8 caracteres:
    } else {
            // caso tenha algum problema na validação das senhas, toda a parte acima será desconsiderada, e iremos para esse ELSE

            toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'erro')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmaSenha("")                  // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3 form' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-white  text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome" className='text-white '>Nome</label>
            <input
              type="text"
              id="nome"
              name="nome" //obrigatorio , preciso colocar o mesmo nome que está no backend
              placeholder="Nome"
              className="border-2 border-t-white  rounded p-2 "
              value={usuario.nome} //o que vai ser preenchido| esse usuario é o que foi criado na model do front
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//chama a função que atualizada as infomações 
              //onChange : atualiza em tempo real as informações no banco de dados 
              //
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className='text-white '>Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-t-white  rounded p-2"
              value={usuario.usuario} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto" className='text-white '>Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-t-white  rounded p-2"
              value={usuario.foto} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha" className='text-white '>Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2    border-t-white  rounded p-2"
              value={usuario.senha} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}//chama a função que atualiza o estado
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha" className='text-white '>Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-t-white  rounded p-2"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}//chama a função que valida a senha
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2' onClick={back}>  {/*quando o usuario clicar , executará a função back , que levara nosso usuário de volta para a tela de login*/}
              Cancelar
            </button>
            <button className='rounded text-white bg-lime-900 hover:bg-indigo-900 w-1/2 py-2' type='submit'>
              Cadastrar
            </button>
          </div>
        </form>

        
      </div>
      
    </>
  )
}

export default Cadastro