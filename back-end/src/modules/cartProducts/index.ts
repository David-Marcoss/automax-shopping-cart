import { CartProductsRepository } from "./cartProducts.repository";
import { CartProductsService } from "./cartProducts.service";

const cartProductsRepository = new CartProductsRepository();
const cartProductsService = new CartProductsService(cartProductsRepository);

export default { cartProductsRepository, cartProductsService };
