import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service" // importa a função login da Service 
// import { toastAlerta } from "../utils/toastAlerta"

// Esse context está gerenciando login, logout e um estado de carregamento, 
//e provendo essas funcionalidades para componentes filhos.


//Promise : é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante
//Promise<void> indica que a função handleLogin retorna uma promessa que, quando resolvida, não produz um valor(void)
// especifica a forma do objeto de contexto de autenticação
interface AuthContextProps {
    usuario: UsuarioLogin //  um usuário (usuario) do tipo UsuarioLogin, que foi construído na models 
    handleLogout(): void //função para logout 
    handleLogin(usuario: UsuarioLogin): Promise<void> //função para login
    isLoading: boolean //boolean que  indica se o carregamento está em andamento
}

//provê as informações para qualquer filho dele
interface AuthProviderProps {
    children: ReactNode //children é um ReactNode, que representa qualquer elemento React que possa ser renderizado
}

//Cria um contexto de autenticação (AuthContext) com um valor inicial vazio, mas com o formato de AuthContextProps.
export const AuthContext = createContext({} as AuthContextProps) //cria um context

//Define o componente AuthProvider, que aceitará children como props.
export function AuthProvider({ children }: AuthProviderProps) {

    //Usa o hook useState para criar um estado usuario com um objeto inicial de UsuarioLogin contendo valores vazios.
    //que será alterado conforme as informações do usuário
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

//useState para criar um estado isLoading, inicialmente false.
    const [isLoading, setIsLoading] = useState(false)


    //função handleLogin, que recebe um objeto UsuarioLogin | função assíncrona , e recebe um objeto do tipo UsuarioLogin e retorna uma promessa
//async: para indicar que ela contém operações assíncronas, como o uso de await
//await : ele pausa a função ,a promessa seja resolvida ou rejeitada 
//e depois retoma a execução da função com o valor resolvido da promessa, ou lança um erro se a promessa for rejeitada.(catch)
    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)//inicia definindo isLoading como true
        try {//tenta fazer o login chamando a função login 
            await login(`/usuarios/logar`, userLogin, setUsuario)//await espera o que o login seja efetuado 
            alert("Usuário logado com sucesso")//se bem-sucedida, exibe um alerta de sucesso 
            setIsLoading(false)//define isLoading como false

        } catch (error) {//Se houver erro, exibe um alerta de erro e define isLoading como false.
            console.log(error)
            alert("Dados do usuário inconsistentes")
            setIsLoading(false)
        }
    }

    // redefine o estado usuario para os valores iniciais vazios.
    //porque aqui ele estaria deslogado , por isso ele voltaria com os valores iniciais vazios
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }
//Retorna o componente AuthProvider que envolve seus children(filhos) no AuthContext.Provider
//, fornecendo o estado e as funções usuario, handleLogin, handleLogout e isLoading para os componentes filhos que consumirem esse contexto.
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}//AuthContext  : utiliza o Context API para fornecer estado e funções relacionadas à autenticação para os componentes filhos.
// Ele permite que os componentes filhos acessem o valor do contexto fornecido