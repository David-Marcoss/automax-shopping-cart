import { CartProductsController as Controller } from "./cartProducts.controller";
import { CartProductsRepository as Repository } from "./cartProducts.repository";
import { CartProductsService as Service } from "./cartProducts.service";

const CartProductsRepository = new Repository();
const CartProductsService = new Service(CartProductsRepository);
const CartProductsController = new Controller(CartProductsService);

export { CartProductsRepository, CartProductsService, CartProductsController };
