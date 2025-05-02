import SQLRepositryFactory from "../../../buenavida/infrastructure/factory/SQLRepositoryFactory";
import SQLRepositryFactoryUser from "../../../users/infrastructure/factory/SQLRepositoryFactoryUser";
import PedidoServiceGet from "../../application/service/PedidoServiceGet";
import PedidoServiceGetPort from "../../domain/interfaces/services/PedidoServiceGetInterface";
import SQLRepositoryPedidoFactory from "./SQLRepositoryPedidoFactory";

export default class PedidoGetServiceFactory {
    public static readonly create = (): PedidoServiceGetPort => {
        const sqlRepositoryPedido = SQLRepositoryPedidoFactory.create();
        const sqlRepositoryProducto = SQLRepositryFactory.create();
        const sqlRepositoryUser = SQLRepositryFactoryUser.create();
        return new PedidoServiceGet(sqlRepositoryPedido, sqlRepositoryProducto, sqlRepositoryUser);
    }
}
