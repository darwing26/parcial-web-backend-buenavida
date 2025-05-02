import UserServiceGet from "../../application/service/UserServiceGet";
import UserServiceGetPort from "../../domain/interfaces/services/UserServiceGetInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryUser";

export default class UserGetServiceFactory {
    public static readonly create = (): UserServiceGetPort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceGet(sqlRepository);
    }
}