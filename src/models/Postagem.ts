import Tema from './Tema';
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Tema | null;//nesse caso não tem o ? , ou seja , é obrigatorio , mas enquanto eu não tenho tema , ele fica null , depois ele é preenchido
  usuario: Usuario | null;//mesma
}