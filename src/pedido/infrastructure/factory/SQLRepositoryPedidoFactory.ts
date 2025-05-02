import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort"
import RepositoryPedido from "../repository/RepositoryPedido"

import SQLRep3 from "../repository/SQLRep3"

export default class SQLRepositoryPedidoFactory {
     public static readonly create = (): IPedidoRepositoryPort => {
            return new RepositoryPedido(new SQLRep3())
        }
}