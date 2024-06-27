import Postagem  from "./Postagem";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  postagem?: Postagem [] | null;// ? : quer dizer que é opcional pode ou não ter . Pode ter postagem(Postagem[]) e null(caso não tenha )
}