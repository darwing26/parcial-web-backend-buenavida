import RepositoryP from "../../repository/RepositoryPedidoI";
import PedidoInterface from "../../types/PedidoDataInterface";

export default interface IPedidoRepositoryPort extends RepositoryP<string, PedidoInterface>{
    getPedidosByUser: (id: string) => Promise<PedidoInterface[]>
}

