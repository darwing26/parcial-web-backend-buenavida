import { Request, Response } from "express";
import UserControllerExpressPort from "../../../domain/interfaces/UserControllerExpressInterface";
import UserUseCaseCreatePort from "../../../domain/port/driver/usecase/UserUseCaseCreatePort";
import UserUseCaseGetPort from "../../../domain/port/driver/usecase/UserUseCaseGetPort";
import UserUseCaseLoginPort from "../../../domain/port/driver/usecase/UserUseCaseLoginPort";
import UserUseCaseUpdatePort from "../../../domain/port/driver/usecase/UserUseCaseUpdatePort";

export default class UserControllerExpress implements UserControllerExpressPort {

    constructor(
        private readonly userUseCaseCreate: UserUseCaseCreatePort,
        private readonly userUseCaseGet: UserUseCaseGetPort,
        private readonly userUseCaseLogin: UserUseCaseLoginPort,
        private readonly userUseCaseUpdate: UserUseCaseUpdatePort
    ) {}

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { nombre, correo, password, telefono, direccion } = req.body;

            // Validar que todos los campos estén presentes
            if (!nombre || !correo || !password || !telefono || !direccion) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }

            // Llamar al caso de uso para crear el usuario
            await this.userUseCaseCreate.createUser(nombre, correo, password, telefono, direccion);

            // Responder con un mensaje de éxito
            res.status(200).json({ message: "Usuario creado exitosamente" });
        } catch (error) {
            // Manejar errores
            console.error("Error al crear el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            // Extraer los datos del cuerpo de la solicitud
            const { correo, password } = req.body;

            // Validar que todos los campos estén presentes
            if (!correo || !password) {
                res.status(400).json({ message: "Correo y contraseña son obligatorios" });
                return;
            }

            // Llamar al caso de uso para realizar el login
            const loginSuccess = await this.userUseCaseLogin.login(correo, password);

            if (loginSuccess) {
                res.status(200).json({ message: "Inicio de sesión exitoso" });
            } else {
                res.status(401).json({ message: "Credenciales inválidas" });
            }
        } catch (error) {
            // Manejar errores
            console.error("Error al realizar el login:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            let id = req.params['id']
            id = id + '';
            if (!id) {
                res.status(400).json({ message: "El ID del usuario es obligatorio" });
                return;
            }
            const user = await this.userUseCaseGet.getUserById(parseFloat(id));

            
            const userR = {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            precio: user.telefono,
            salea: user.direccion,
            }
            
            res.status(200).json(userR);  

        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            
            const { id, nombre, correo, password, telefono, direccion } = req.body;
            
            if (!id || !nombre || !correo || !password || !telefono || !direccion) {
                res.status(400).json({ message: "Todos los campos son obligatorios" });
                return;
            }
        
            await this.userUseCaseUpdate.updateUser(parseFloat(id), nombre, correo, password, telefono, direccion);

            res.status(200).json({ message: "Usuario actualizado exitosamente" });
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}