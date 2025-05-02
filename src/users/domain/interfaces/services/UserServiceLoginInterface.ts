export default interface UserServiceLoginInterface {
    login(correo: string, password: string): Promise<boolean>;
}