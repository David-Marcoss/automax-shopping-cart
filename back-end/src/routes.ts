import { cartsRoutes } from "./modules/carts/carts.routes";
import { app } from "./server";

app.use(cartsRoutes);
