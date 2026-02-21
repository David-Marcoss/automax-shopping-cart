import { CartsController as Controller } from "./carts.controller";
import { CartsRepository as Repository } from "./carts.repository";
import { CartsService as Service } from "./carts.service";

const CartsRepository = new Repository();
const CartsService = new Service(CartsRepository);
const CartsController = new Controller(CartsService);

export { CartsRepository, CartsService, CartsController };
