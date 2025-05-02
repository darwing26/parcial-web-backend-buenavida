import Cliente from "../../../model/client/Client";

export default interface UserUseCaseGetPort { 
    getUserById(id: number): Promise<Cliente>;
}