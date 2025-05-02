export default interface UserUseCaseUpdatePort {
    updateUser(
        id: number,
        nombre: string,
        correo: string,
        password: string,
        telefono: string,
        dirrecion: string
    ): Promise<void>;
}
