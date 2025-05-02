import { connectToDatabase } from "./conectdb";

export default class SQLRep {
    private readonly queryGetProducts = "CALL GetAllProductos();";
    private readonly queryGetProductsById = "CALL GetAllProductosById(?);";
    private readonly queryInsertProduct = "CALL GuardarProducto(?, ?, ?, ?, ?)";
    private readonly queryDeleteProduct = "CALL EliminarProducto(?)";
    private readonly queryUpdateProduct = "CALL ActualizarProducto(?, ?, ?, ?, ?, ?)";


    constructor() { }

    public findAll = async () => {
        const conectionDB = await connectToDatabase();
        const [rows] = (await conectionDB.execute(this.queryGetProducts)) as any[];

        if (rows.length > 0) {
            
            return rows;
        } else {
            
            return null;
        }
    }

    public getById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [rows] = (await conectionDB.execute(this.queryGetProductsById, [
            id,
        ])) as any[];

        if (rows[0].length > 0) {
            return rows[0];
        } else {
            return null;
        }
    }

    public save = async (
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        descripcion: string
    ) => {
        try {
            
            const connectionDB = await connectToDatabase();
            
            await connectionDB.execute(this.queryInsertProduct, [
                nombre,
                medida,
                precio,
                salea,
                descripcion,
            ]);
            console.log("Producto guardado exitosamente");
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    }

    public deleteById = async (id: number): Promise<void> => {
        try {
            const connectionDB = await connectToDatabase(); 
            await connectionDB.execute(this.queryDeleteProduct, [id]);
            console.log(`Producto con ID ${id} eliminado exitosamente`);
        } catch (error) {
            console.error("Error en SQLRep al eliminar el producto:", error);
            throw new Error("Error al eliminar el producto en la base de datos");
        }
    }

    public update = async (
        id: number,
        nombre: string,
        medida: string,
        precio: number,
        salea: string,
        descripcion: string
    ): Promise<void> => {
        try {
            const connectionDB = await connectToDatabase(); 
            await connectionDB.execute(this.queryUpdateProduct, [
                id,
                nombre,
                medida,
                precio,
                salea,
                descripcion,
            ]);
            console.log(`Producto con ID ${id} actualizado exitosamente`);
        } catch (error) {
            console.error("Error en SQLRep al actualizar el producto:", error);
            throw new Error("Error al actualizar el producto en la base de datos");
        }
    };
}
