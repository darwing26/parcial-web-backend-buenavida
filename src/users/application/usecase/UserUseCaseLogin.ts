import UserServiceLoginPort from "../../domain/interfaces/services/UserServiceLoginInterface";
import UserUseCaseLoginPort from "../../domain/port/driver/usecase/UserUseCaseLoginPort";

export default class UserUseCaseLogin implements UserUseCaseLoginPort {

    constructor(private readonly userServiceLogin: UserServiceLoginPort) {}

    public async login(correo: string, password: string): Promise<boolean> {
        try {
            const loginSuccess = await this.userServiceLogin.login(correo, password);
            return loginSuccess;
        } catch (error) {
            console.error("Error en UserUseCaseLogin:", error);
            throw new Error("Error al realizar el login");
        }
    }
}