import Tema from './Tema';
import Usuario from './Usuario';

// define uma interface chamada Postagem e a exporta como padrão
//garante que qualquer objeto de Postagem tenha essa estrutura
//definir a estrutura de um objeto, especificando quais propriedades ele deve ter e seus tipos.
//export default: Significa que ele esta exportando uma única entidade de um módulo, tornando-a a exportação padrão desse módulo
export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  tema: Tema | null;// é obrigatorio , mas enquanto eu não tenho tema , ele pode ser  null , depois ele é preenchido
  usuario: Usuario | null;//mesma
}