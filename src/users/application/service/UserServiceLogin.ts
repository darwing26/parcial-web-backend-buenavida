import UserServiceLoginPort from "../../domain/interfaces/services/UserServiceLoginInterface";
import IUserRepository from "../../domain/port/driven/UserRepositoryPort";

export default class UserServiceLogin implements UserServiceLoginPort {

    constructor(private readonly userRepository: IUserRepository) {}

    public async login(correo: string, password: string): Promise<boolean> {
        try {
            const loginSuccess = await this.userRepository.login(correo, password);
            return loginSuccess;
        } catch (error) {
            console.error("Error en UserServiceLogin:", error);
            throw new Error("Error al realizar el login");
        }
    }
}