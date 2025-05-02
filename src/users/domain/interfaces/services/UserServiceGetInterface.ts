import Cliente from "../../model/client/Client";

export default interface UserServiceGetInterface {    
    getUserById(id: number): Promise<Cliente>;
}