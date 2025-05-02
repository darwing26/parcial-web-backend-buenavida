import UserRepositoryPort from "../../domain/port/driven/UserRepositoryPort";
import SQLRep2 from "../repository/SQLRep2";
import UserRepository from "../repository/UserRepository";

export default class SQLRepositryFactoryUser {
    public static readonly create = (): UserRepositoryPort => {
        return new UserRepository(new SQLRep2())
    }
}