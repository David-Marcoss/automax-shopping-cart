import { ProductsController as Controller } from "./products.controller";
import { ProductsRepository as Repository } from "./products.repository";
import { ProductsService as Service } from "./products.service";

const ProductsRepository = new Repository();
const ProductsService = new Service(ProductsRepository);
const ProductsController = new Controller(ProductsService);

export { ProductsRepository, ProductsService, ProductsController };
