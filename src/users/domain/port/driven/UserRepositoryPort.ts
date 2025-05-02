import Repository from "../../repository/RepositoryUserI";
import ClienteInterface from "../../types/ClienteInterface";

export default interface UserRepositoryPort extends Repository<string, ClienteInterface> {
    login(correo: string, password: string): Promise<boolean>;
}