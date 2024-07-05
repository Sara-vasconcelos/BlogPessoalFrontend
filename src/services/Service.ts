import axios from "axios";

//axios: permite que a aplicação react faça requisões HTTP para uma API e receba resposta
//Antes a gente usava o insomnia , agora vamos usar o Axios , pq ele consegue se comunicar com o backend e o front end.

//em geral, são utilizadas para realizar operações de CRUD (Create, Read, Update, Delete) em um backend.-

//Service:  é um módulo ou uma classe que encapsula uma funcionalidade específica da aplicação
//como o acesso a uma API, a manipulação de dados, a autenticação de usuários, entre outros
//contêm métodos que realizam operações assíncronas, como a realização de requisições HTTP, e retornam Promises com os resultados dessas operações.

const api = axios.create({//Cria uma instância personalizada do Axios
  baseURL: import.meta.env.VITE_API_URL// URL base para todas as requisições HTTP realizadas através dessa instância do Axios.
  //no caso a do Render
})
//o cadastrar e o login, não precisa do header pq são metodos GET , ou seja , ao inves do header o objeto são os dados inseridos
//Exporta a função para ser usada em outros módulos
// função assíncrona que aceita uma URL, um objeto com os dados e uma função para definir os dados.
//export const cadastrarUsuario: toda vez que eu  digitar | chamar cadastrarUsuario , é como se eu estivesse digitando toda essa função
export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)//Realiza uma requisição POST à URL especificada, enviando os dados fornecidos.
  setDados(resposta.data)//Atualiza o estado ou a variável com os dados da resposta.
}//toda vez que preciso solicitar dados do meu backend , essa solicitação é feita com uma função async

//dados : Object : é o json , com os dados que serão enviados

//mesma coisa que a função acima , porém para o Login 
//POST
export const login = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}
//esse header: é o Authorization do insomnia que recebe o token (object)
//GET : BUSCAR
export const buscar = async(url: string, setDados: Function, header: Object) => {
  const resposta = await api.get(url, header)
  setDados(resposta.data)
}

//CADASTRAR : POST
export const cadastrar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.post(url, dados, header)
  setDados(resposta.data)
}

//Atualizar : PUT
export const atualizar = async(url: string, dados: Object, setDados: Function, header: Object) => {
  const resposta = await api.put(url, dados, header)
  setDados(resposta.data)
}

//Deletar: DELETE
export const deletar = async(url: string, header: Object) => {
  await api.delete(url, header)
}