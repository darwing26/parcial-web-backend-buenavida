import UserServiceUpdate from "../../application/service/UserServiceUpdate";
import UserServiceUpdatePort from "../../domain/interfaces/services/UserServiceUpdateInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryUser";

export default class UserUpdateServiceFactory {
    public static readonly create = (): UserServiceUpdatePort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceUpdate(sqlRepository);
    }
}