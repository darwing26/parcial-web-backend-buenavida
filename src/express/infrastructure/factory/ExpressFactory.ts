import ProductUseCaseCreate from "../../../buenavida/application/usecase/ProductsUseCaseCreate";
import ProductUseCaseDelete from "../../../buenavida/application/usecase/ProductsUseCaseDelete";
import ProductUseCaseGet from "../../../buenavida/application/usecase/ProductsUseCaseGet";
import ProductUseCaseUpdate from "../../../buenavida/application/usecase/ProductsUseCaseUpdate";
import ProductController from "../../../buenavida/infrastructure/express/controller/ProductController";
import ProductRouterExpress from "../../../buenavida/infrastructure/express/router/ProductRouter";
import ProductCreateServiceFactory from "../../../buenavida/infrastructure/factory/ProductCreateServiceFactory";
import ProductDeleteServiceFactory from "../../../buenavida/infrastructure/factory/ProductDeleteServiceFactory";
import ProductGetServiceFactory from "../../../buenavida/infrastructure/factory/ProductGetServiceFactory";
import ProductUpdateServiceFactory from "../../../buenavida/infrastructure/factory/ProductUpdateServiceFactory";
import PedidoUseCaseCreate from "../../../pedido/application/usecase/PedidoUseCaseCreate";
import PedidoUseCaseDelete from "../../../pedido/application/usecase/PedidoUseCaseDelete";
import PedidoUseCaseGet from "../../../pedido/application/usecase/PedidoUseCaseGet";
import PedidoController from "../../../pedido/infrastructure/express/controller/PedidoController";
import PedidoRouter from "../../../pedido/infrastructure/express/router/PedidoRouter";
import PedidoCreateServiceFactory from "../../../pedido/infrastructure/factory/PedidoCreateServiceFactory";
import PedidoDeleteServiceFactory from "../../../pedido/infrastructure/factory/PedidoDeleteServiceFactory";
import PedidoGetServiceFactory from "../../../pedido/infrastructure/factory/PedidoGetServiceFactory";
import UserUseCaseCreate from "../../../users/application/usecase/UserUseCaseCreate";
import UserUseCaseGet from "../../../users/application/usecase/UserUseCaseGet";
import UserUseCaseLogin from "../../../users/application/usecase/UserUseCaseLogin";
import UserUseCaseUpdate from "../../../users/application/usecase/UserUseCaseUpdate";
import UserControllerExpress from "../../../users/infrastructure/express/controller/UserController";
import UserRouterExpress from "../../../users/infrastructure/express/router/UserRouterExpress";
import UserCreateServiceFactory from "../../../users/infrastructure/factory/UserCreateServiceFactory";
import UserGetServiceFactory from "../../../users/infrastructure/factory/UserGetServiceFactory";
import UserLoginServiceFactory from "../../../users/infrastructure/factory/UserLoginServiceFactory";
import UserUpdateServiceFactory from "../../../users/infrastructure/factory/UserUpdateServiceFactory";

import Server from "../server/Server";

export default class ExpressFactory {
  public static readonly create = (): Server => {

    const productGetService = ProductGetServiceFactory.create()
    const productGetUseCase = new ProductUseCaseGet(productGetService)

    const productCreateService = ProductCreateServiceFactory.create()
    const productCreateUseCase = new ProductUseCaseCreate(productCreateService)

    const productDeleteService = ProductDeleteServiceFactory.create()
    const productDeleteUseCase = new ProductUseCaseDelete(productDeleteService)

    const productUpdateService = ProductUpdateServiceFactory.create()
    const productUpdateUseCase = new ProductUseCaseUpdate(productUpdateService)

    const productController = new ProductController(productGetUseCase, productCreateUseCase, productDeleteUseCase, productUpdateUseCase)
    const productRouter = new ProductRouterExpress(productController)

    // =================================================================================

    const userCreateService = UserCreateServiceFactory.create();
    const userCreateUseCase = new UserUseCaseCreate(userCreateService)

    const userGetService = UserGetServiceFactory.create()
    const userGetUseCase = new UserUseCaseGet(userGetService)

    const userLoginService = UserLoginServiceFactory.create();
    const userLoginUseCase = new UserUseCaseLogin(userLoginService);

    const userUpdateService = UserUpdateServiceFactory.create();
    const userUpdateUseCase = new UserUseCaseUpdate(userUpdateService);

    const userController = new UserControllerExpress(userCreateUseCase, userGetUseCase, userLoginUseCase, userUpdateUseCase)
    const userRouter = new UserRouterExpress(userController)

    // =================================================================================

    // Crear instancias de los servicios utilizando las fábricas
    const pedidoCreateService = PedidoCreateServiceFactory.create();
    const pedidoCreateUseCase = new PedidoUseCaseCreate(pedidoCreateService);

    const pedidoDeleteService = PedidoDeleteServiceFactory.create();
    const pedidoDeleteUseCase = new PedidoUseCaseDelete(pedidoDeleteService);

    const pedidoGetService = PedidoGetServiceFactory.create();
    const pedidoGetUseCase = new PedidoUseCaseGet(pedidoGetService);

    const pedidoController = new PedidoController(pedidoGetUseCase, pedidoCreateUseCase, pedidoDeleteUseCase);
    const pedidoRouter = new PedidoRouter(pedidoController);

    const server = new Server([productRouter, userRouter, pedidoRouter]);
    return server
  }
}