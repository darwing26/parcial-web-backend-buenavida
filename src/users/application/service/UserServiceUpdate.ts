import UserServiceUpdatePort from "../../domain/interfaces/services/UserServiceUpdateInterface";
import IUserRepository from "../../domain/port/driven/UserRepositoryPort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserServiceUpdate implements UserServiceUpdatePort {

    constructor(private readonly userRepository: IUserRepository) {}

    public async updateUser(id: number, user: ClienteInterface): Promise<void> {
        try {
            await this.userRepository.update(id.toString(), user);
            console.log("Usuario actualizado exitosamente");
        } catch (error) {
            console.error("Error en UserServiceUpdate:", error);
            throw new Error("Error al actualizar el usuario");
        }
    }
}
