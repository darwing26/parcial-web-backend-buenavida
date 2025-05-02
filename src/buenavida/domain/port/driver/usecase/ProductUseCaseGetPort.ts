import Product from "../../../model/Products/Product";

export default interface ProductUseCaseGetPort {
    getAllProduct(): Promise<Product[]>
    getProductById(id :number): Promise<Product>
    getProductImage(file: string): Promise<string>
}