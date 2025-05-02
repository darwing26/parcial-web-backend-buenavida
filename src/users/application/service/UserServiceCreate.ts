import UserServiceCreatePort from "../../domain/interfaces/services/UserServiceCreateInterface";
import IUserRepository from "../../domain/port/driven/UserRepositoryPort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserServiceCreate implements UserServiceCreatePort {

    constructor(private readonly userRepository: IUserRepository) {}

    public async createUser(user: ClienteInterface): Promise<void> {
        try {
            this.userRepository.save(user);
            console.log("Usuario creado exitosamente");
        } catch (error) {
            console.error("Error en UserServiceCreate:", error);
            throw new Error("Error al crear el usuario");
        }
    }
}