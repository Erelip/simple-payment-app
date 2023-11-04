import defaultRoute from "@routes/default.route";
import productsRoute from "@routes/products.route";
import authRoute from "@routes/auth.route";
import cartRoute from "@routes/cart.route";
import { Router } from "express";

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: "/default",
        route: defaultRoute,
    },
    {
        path: "/products",
        route: productsRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/cart",
        route: cartRoute,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
