import IProductRepository from "../../domain/port/driven/ProductRepositoyPort";
import ProductRepository from "../repository/ProductRepository";
import SQLRep from "../repository/SQLRep";

export default class SQLRepositryFactory {
    public static readonly create = (): IProductRepository => {
        return new ProductRepository(new SQLRep())
    }
}