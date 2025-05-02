import UserServiceUpdatePort from "../../domain/interfaces/services/UserServiceUpdateInterface";
import UserUseCaseUpdatePort from "../../domain/port/driver/usecase/UserUseCaseUpdatePort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserUseCaseUpdate implements UserUseCaseUpdatePort {

    constructor(private readonly userServiceUpdate: UserServiceUpdatePort) {}

    public async updateUser(
        id: number,
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ): Promise<void> {
        try {
            const user: ClienteInterface = {
                id,
                nombre,
                correo,
                password,
                telefono,
                direccion
            };

            await this.userServiceUpdate.updateUser(id, user);
        } catch (error) {
            console.error("Error en UserUseCaseUpdate:", error);
            throw new Error("Error al actualizar el usuario");
        }
    }
}