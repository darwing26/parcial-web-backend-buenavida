export default interface UserUseCaseCreatePort {
    createUser(
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        dirrecion: string
    ): Promise<void>;
}