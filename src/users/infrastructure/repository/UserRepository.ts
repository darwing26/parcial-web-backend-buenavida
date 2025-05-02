import UserRepositoryPort from "../../domain/port/driven/UserRepositoryPort";
import ClienteInterface from "../../domain/types/ClienteInterface";

import SQLRep2 from "./SQLRep2";

export default class UserRepository implements UserRepositoryPort {

    constructor(private readonly sqlRep2: SQLRep2) {}


    findById = async (id: string): Promise<ClienteInterface> => {
        const userFromDB = await this.sqlRep2.getById(parseFloat(id));
        if (userFromDB == null) return {
            id: 0,
            nombre: '',
            correo: '',
            password: '',
            telefono: '',
            direccion: ''
        };

        const userItemDb = userFromDB[0];

        const user = {
            id: userItemDb.idusuarios,
            nombre: userItemDb.nombre,
            correo: userItemDb.correo,
            password: userItemDb.password,
            telefono: userItemDb.telefono,
            direccion: userItemDb.direccion
        };

        return user;
    }

    save = (item: ClienteInterface): void => {
        try {
            this.sqlRep2.save(
                item.nombre,
                item.correo,
                item.password,
                item.telefono,
                item.direccion
            );
            console.log('Usuario guardado exitosamente');
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    }

    update = async (id: string, item: ClienteInterface): Promise<void> => {
        try {
            await this.sqlRep2.update(
                parseFloat(id),
                item.nombre,
                item.correo,
                item.password,
                item.telefono,
                item.direccion
            );
            console.log(`Usuario con ID ${id} actualizado exitosamente`);
        } catch (error) {
            console.error("Error en UserRepository al actualizar el usuario:", error);
            throw new Error("Error al actualizar el usuario");
        }
    };

    
    login = async (correo: string, password: string): Promise<boolean> => {
        try {
            const loginSuccess = await this.sqlRep2.login(correo, password);
            return loginSuccess;
        } catch (error) {
            console.error("Error en UserRepository al realizar el login:", error);
            throw new Error("Error al realizar el login");
        }
    };
}