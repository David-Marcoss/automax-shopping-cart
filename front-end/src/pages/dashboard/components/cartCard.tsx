import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { ICart } from "@/shared/interfaces/carts/ICarts";
import { Link } from "react-router-dom";

interface ICardProps {
  cart: ICart;
}

export default function CartCard({ cart }: ICardProps) {
  return (
    <Link to={`/carts/${cart.id}`}>
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
            Carrinho #{cart.id}
            <Badge variant="secondary">
              {cart?.products?.length ?? 0} itens
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <span className="font-medium">Usuário:</span> {cart.userId}
          </p>
          <p>
            <span className="font-medium">Data:</span>{" "}
            {new Date(cart.date).toLocaleDateString()}
          </p>

          {cart.products && (
            <div className="space-y-1">
              {cart.products.slice(0, 3).map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between text-muted-foreground"
                >
                  <span>Produto #{product.productId}</span>
                  <span>x{product.quantity}</span>
                </div>
              ))}

              {cart.products.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  + {cart.products.length - 3} outros itens...
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
