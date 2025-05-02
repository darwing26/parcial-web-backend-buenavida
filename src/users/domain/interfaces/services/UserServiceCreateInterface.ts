import ClienteInterface from "../../types/ClienteInterface";

export default interface UserServiceCreateInterface {
    createUser(user: ClienteInterface): Promise<void>;
}