import UserServiceCreatePort from "../../domain/interfaces/services/UserServiceCreateInterface";
import UserUseCaseCreatePort from "../../domain/port/driver/usecase/UserUseCaseCreatePort";
import ClienteInterface from "../../domain/types/ClienteInterface";

export default class UserUseCaseCreate implements UserUseCaseCreatePort {

    constructor(private readonly userServiceCreate: UserServiceCreatePort) {}

    public async createUser(
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ): Promise<void> {
        const user: ClienteInterface = {
            id: 0, // El ID se genera en la base de datos
            nombre,
            correo,
            password,
            telefono,
            direccion
        };

        await this.userServiceCreate.createUser(user);
    }
}