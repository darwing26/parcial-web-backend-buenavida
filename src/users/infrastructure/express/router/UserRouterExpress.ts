import RouterExpress from "../../../../express/domain/RouterExpress";
import UserControllerExpressPort from "../../../domain/interfaces/UserControllerExpressInterface";
import UserRouterExpressInterface from "../../../domain/interfaces/UserRouterExpressInterface";

export default class UserRouterExpress extends RouterExpress implements UserRouterExpressInterface {

    constructor(private readonly userController: UserControllerExpressPort) {
        super();
        this.routes();
    }

    public routes = (): void => {
        this.createUser();
        this.login();
        this.getUser();
        this.updateUser();
    }

    public createUser(): void {
        this.router.post(
            '/createuser',
            this.userController.createUser.bind(this.userController)
        );
    }

    public login(): void {
        this.router.post(
            '/login',
            this.userController.login.bind(this.userController)
        );
    }

    public getUser(): void {
        this.router.get(
            '/user/:id',
            this.userController.getUser.bind(this.userController)
        );
    }

    public updateUser(): void {
        this.router.put(
            '/updateuser',
            this.userController.updateUser.bind(this.userController)
        );
    }
}