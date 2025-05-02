import UserServiceCreate from "../../application/service/UserServiceCreate";
import UserServiceCreatePort from "../../domain/interfaces/services/UserServiceCreateInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryUser";

export default class UserCreateServiceFactory {
    public static readonly create = (): UserServiceCreatePort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceCreate(sqlRepository);
    }
}