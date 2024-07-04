import React, { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import CardTemas from '../CardTema/CardTema';
import { toastAlerta } from '../../../util/toastAlerta';


function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);

  const navigate = useNavigate();
  //const [loading, setLoading] = useState<boolean>(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  //Usa a função buscar para obter os dados dos temas e armazena-os no estado temas, passando o token de autorização nos headers. Caso ocorra um erro, ele é capturado
  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });// Trata erros específicos de token expirado, exibindo um alerta e chamando a função handleLogout para desconectar o usuário.
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, logue novamente', 'info')
        handleLogout()
      }
    }
  }
//verificar se o usuário está logado. Se o token estiver vazio, exibe um alerta e redireciona para a página de login.
  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado', 'info');
      navigate('/login');
    }
  }, [token]);

  // buscar a lista de temas quando o componente é montado e sempre que o comprimento da lista temas mudar.
  useEffect(() => {
    buscarTemas();
  }, [temas.length]);
  return (
    <>
    {/*Renderiza um componente Dna (um spinner de carregamento) se a lista temas estiver vazia.Fica rodando o icone de carregamento*/}
      {temas.length === 0 && (
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />

        
      )}

{/* {temas.length === 0 && !loading && (
        <p className="text-center">Não tem tema</p>
      )} */}


      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/*Mapeia a lista temas para renderizar um componente CardTemas para cada tema, passando o tema como prop e definindo a key como o id do tema.*/}

            {temas.map((tema) => (
              <>
                <CardTemas key={tema.id} tema={tema} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;