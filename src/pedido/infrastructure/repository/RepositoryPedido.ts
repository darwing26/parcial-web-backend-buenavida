import IPedidoRepositoryPort from "../../domain/port/driven/PedidoRepositoryPort";
import PedidoDataInterface, { ProductoPedidoInterface } from "../../domain/types/PedidoDataInterface";

import SQLRep3 from "./SQLRep3";


export default class RepositoryPedido implements IPedidoRepositoryPort {


    constructor(private readonly sqlRep: SQLRep3) {
        this.sqlRep = sqlRep;
    }

    public findAll = async (): Promise<PedidoDataInterface[]> => {
        const pedidosFromDB = await this.sqlRep.findAll();

        return await Promise.all(
            pedidosFromDB.map(async (pedido: any) => {
                if (pedido.idpedido === undefined || pedido.idpedido === null) {
                    console.error("Error: pedido.idpedido es undefined o null", pedido);
                    return null; 
                }
                return {
                    id: pedido.idpedido,
                    usuarioId: pedido.usuarios_idusuarios,
                    total: pedido.total,
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    productos: await this.generateProductsInfo(pedido.idpedido)
                };
            })
        ).then(pedidos => pedidos.filter(pedido => pedido !== null));
    };

    public findById = async (id: string): Promise<PedidoDataInterface> => {
        const pedidoFromDB = await this.sqlRep.getPedidoById(parseInt(id));    

        if (!pedidoFromDB) {
            throw new Error("Pedido no encontrado");
        }

        const pp = pedidoFromDB[0];

        return {
            id: pp.idpedido,
            usuarioId: pp.usuarios_idusuarios,
            total: pp.total,
            estado: pp.estado,
            fecha: pp.fecha,
            productos: await this.generateProductsInfo(pp.idpedido)
        };
    }

    public getPedidosByUser = async (id: string): Promise<PedidoDataInterface[]> => {
        const pedidosFromDB = await this.sqlRep.getPedidosByClient(parseInt(id));

        const ppS = pedidosFromDB[0];

        return await Promise.all(
            ppS.map(async (pedido: any) => {
                if (pedido.idpedido === undefined || pedido.idpedido === null) {
                    console.error("Error: pedido.idpedido es undefined o null", pedido);
                    return null; 
                }
                return {
                    id: pedido.idpedido,
                    usuarioId: pedido.usuarios_idusuarios,
                    total: pedido.total,
                    estado: pedido.estado,
                    fecha: pedido.fecha,
                    productos: await this.generateProductsInfo(pedido.idpedido)
                };
            })
        ).then(pedidos => pedidos.filter(pedido => pedido !== null));
    }

    public save = async (pedidoData: PedidoDataInterface): Promise<void> => {
        try {
            const { usuarioId, total, fecha, estado, productos } = pedidoData;
            
            const productosConvertidos = productos.map(producto => ({
                id: producto.productos_idproductos, 
                cantidad: producto.cantidad 
            }));

            const pedidoId = await this.sqlRep.save(usuarioId, total, fecha, productosConvertidos, estado);
    
            console.log("Pedido guardado exitosamente con ID:", pedidoId);
        } catch (error) {
            console.error("Error en PedidoRepository (save):", error);
            throw new Error("Error al guardar el pedido en la base de datos");
        }
    }

    public delete = async (id: string): Promise<boolean> => {
        try {
            await this.sqlRep.deleteById(parseInt(id, 10));
            console.log("Pedido eliminado exitosamente");
            return true;
        } catch (error) {
            console.error("Error en RepositryPedido (delete):", error);
            throw new Error("Error al eliminar el pedido en la base de datos");
        }
    }

    private generateProductsInfo = async (idPedido : number) : Promise<ProductoPedidoInterface[]> => {
        const productosDelPedido = await this.sqlRep.getProductosByPedido(idPedido);

        return productosDelPedido.map((producto: any) => ({
            productos_idproductos: producto.productos_idproductos,
            cantidad: producto.cantidad
        }));
    }
}