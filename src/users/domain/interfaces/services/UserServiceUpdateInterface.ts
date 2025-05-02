import ClienteInterface from "../../types/ClienteInterface";

export default interface UserServiceUpdateInterface {
    updateUser(id: number, cliente : ClienteInterface): Promise<void>;
}