import { Request, Response } from "express";
import ProductControllerExpressPort from "../../../domain/interfaces/ProductControllerExpressInterface";
import ProductUseCaseGetPort from "../../../domain/port/driver/usecase/ProductUseCaseGetPort";
import ProductUseCaseCreatePort from "../../../domain/port/driver/usecase/ProductUseCaseCreatePort";
import ProductUseCaseDeletePort from "../../../domain/port/driver/usecase/ProductUseCaseDeletePort";
import ProductUseCaseUpdatePort from "../../../domain/port/driver/usecase/ProductUseCaseUpdatePort";

export default class ProductController implements ProductControllerExpressPort {

    constructor(
        private readonly productUseCaseGet : ProductUseCaseGetPort,
        private readonly productUseCaseCreate : ProductUseCaseCreatePort,
        private readonly productUseCaseDelete  : ProductUseCaseDeletePort,
        private readonly productUseCaseUpdate : ProductUseCaseUpdatePort 

    ) {}


    public async getAllProducts(_req: Request, res: Response): Promise<void> {
        const products = await this.productUseCaseGet.getAllProduct()
        const productsResponse = products.map((product) => {
            return {
                id: product.id,
                nombre: product.nombre,
                medida: product.medida,
                precio: product.precio,
                salea: product.salea,
                descripcion : product.description,
                image : product.urlImage
            }
        })
        res.status(200).json(productsResponse)
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        let id = req.params['id']
        id = id + ''

        const product = await this.productUseCaseGet.getProductById(parseFloat(id))
        const productR = {
            id: product.id,
            nombre: product.nombre,
            medida: product.medida,
            precio: product.precio,
            salea: product.salea,
            descripcion : product.description,
            image : product.urlImage
        }
        res.status(200).json(productR);  
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { nombre, medida, precio, salea, descripcion } = req.body;

            // Validar que todos los campos estén presentes
            if (!nombre || !medida || !precio || !salea || !descripcion) {
                res.status(400).json({ message: 'Todos los campos son obligatorios' });
                return;
            }

            // Llamar al caso de uso para guardar el producto
            await this.productUseCaseCreate.createProduct(nombre, medida, precio, salea, descripcion);

            // Responder con un mensaje de éxito
            res.status(200).json({ message: 'Producto guardado exitosamente', data: { nombre, medida, precio, salea, descripcion } });
        } catch (error) {
            // Manejar errores
            console.error('Error al guardar el producto:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer el ID del producto de los parámetros de la solicitud
            const { id } = req.params;

            // Validar que el ID esté presente
            if (!id) {
                res.status(400).json({ message: "El ID del producto es obligatorio" });
                return;
            }

            // Convertir el ID a número
            const productId = parseInt(id, 10);

            // Llamar al caso de uso para eliminar el producto
            await this.productUseCaseDelete.deleteProduct(productId);

            // Responder con un mensaje de éxito
            res.status(200).json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al eliminar el producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { id, nombre, medida, precio, salea, descripcion } = req.body;

            // Validar que todos los campos estén presentes
            if (!id || !nombre || !medida || !precio || !salea || !descripcion) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }

            // Convertir el ID a número
            const productId = parseInt(id, 10);

            // Llamar al caso de uso para actualizar el producto
            await this.productUseCaseUpdate.updateProduct(
                productId,
                nombre,
                medida,
                precio,
                salea,
                descripcion
            );

            // Responder con un mensaje de éxito
            res.status(200).json({ message: "Producto actualizado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al actualizar el producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getProductImage(req: Request, res: Response): Promise<void> {
        try {
            // Extraer el nombre de la imagen de los parámetros de la solicitud
            const { name } = req.params;

            // Validar que el nombre de la imagen esté presente
            if (!name) {
                res.status(400).json({ message: "El nombre de la imagen es obligatorio" });
                return;
            }

            // Llamar al caso de uso para obtener la imagen
            const imagePath = await this.productUseCaseGet.getProductImage(name);

            // Responder con la imagen
            res.status(200).sendFile(imagePath);
        } catch (error) {
            // Manejar errores
            console.error("Error al obtener la imagen del producto:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }



}