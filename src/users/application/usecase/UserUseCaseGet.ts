import UserServiceGetPort from "../../domain/interfaces/services/UserServiceGetInterface";
import Cliente from "../../domain/model/client/Client";
import UserUseCaseGetPort from "../../domain/port/driver/usecase/UserUseCaseGetPort";

export default class UserUseCaseGet implements UserUseCaseGetPort {

    constructor(private readonly userServiceGet: UserServiceGetPort) {}

    public getUserById = async (id: number): Promise<Cliente> => {
        const user = await this.userServiceGet.getUserById(id);
        return user;
    }
    
}