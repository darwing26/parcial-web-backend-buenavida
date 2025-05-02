import { connectToDatabase } from "../../../buenavida/infrastructure/repository/conectdb";

export default class SQLRep2 {
    
    private readonly queryGetUserById = "CALL GetUserById(?);";
    private readonly queryInsertUser = "CALL GuardarUsuario(?, ?, ?, ?, ?);";
    private readonly queryUpdateUser = "CALL ActualizarUsuario(?, ?, ?, ?, ?, ?);";
    private readonly queryLogin = "CALL LoginUsuario(?, ?);";

    constructor() { }

    public getById = async (id: number) => {
        const connectionDB = await connectToDatabase();
        const [rows] = (await connectionDB.execute(this.queryGetUserById, [id])) as any[];

        if (rows[0].length > 0) {
           
            return rows[0];
        } else {
            console.log("No se encontró un usuario con el ID proporcionado");
            return null;
        }
    }

    public save = async (
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ) => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.execute(this.queryInsertUser, [
                nombre,
                correo,
                password,
                telefono,
                direccion,
            ]);
            console.log("Usuario guardado exitosamente");
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
        }
    }

    public update = async (
        id: number,
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        direccion: string
    ): Promise<void> => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.execute(this.queryUpdateUser, [
                id,
                nombre,
                correo,
                password,
                telefono,
                direccion,
            ]);
            console.log(`Usuario con ID ${id} actualizado exitosamente`);
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            throw new Error("Error al actualizar el usuario en la base de datos");
        }
    }

    public login = async (correo: string, password: string): Promise<boolean> => {
        try {
            const connectionDB = await connectToDatabase();
            const [rows] = (await connectionDB.execute(this.queryLogin, [
                correo,
                password,
            ])) as any[];

            if (rows[0].length > 0) {
                console.log("Inicio de sesión exitoso");
                return true; // Credenciales válidas
            } else {
                console.log("Credenciales inválidas");
                return false; // Credenciales inválidas
            }
        } catch (error) {
            console.error("Error en SQLRep al realizar el login:", error);
            throw new Error("Error al realizar el login en la base de datos");
        }
    }
}