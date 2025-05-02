export default interface UserUseCaseLoginPort {
    login(
        correo: string,
        password: string
    ): Promise< boolean >;
    
}