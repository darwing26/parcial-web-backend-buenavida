import UserServiceLogin from "../../application/service/UserServiceLogin";
import UserServiceLoginPort from "../../domain/interfaces/services/UserServiceLoginInterface";
import SQLRepositryFactoryUser from "./SQLRepositoryFactoryUser";

export default class UserLoginServiceFactory {
    public static readonly create = (): UserServiceLoginPort => {
        const sqlRepository = SQLRepositryFactoryUser.create();
        return new UserServiceLogin(sqlRepository);
    }
}