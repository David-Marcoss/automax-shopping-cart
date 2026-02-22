import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import type { ICartProduct } from "@/shared/interfaces/cartProducts/ICartProducts";

interface IProductCardProps {
  cartProduct: ICartProduct;
}

export default function ProductCard({ cartProduct }: IProductCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-6 grid md:grid-cols-4 gap-6">
        <div className="flex items-center justify-center">
          <img
            src={cartProduct.product!.image}
            alt={cartProduct.product!.title}
            className="h-32 object-contain"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <h3 className="font-semibold text-base">
            {cartProduct.product!.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {cartProduct.product!.description}
          </p>
          <Badge variant="outline">{cartProduct.product!.category}</Badge>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="text-right">
            <p className="text-muted-foreground text-sm">Preço</p>
            <p className="font-semibold">
              R$ {cartProduct.product!.price.toFixed(2)}
            </p>
          </div>

          <Separator className="my-2" />

          <div className="text-right">
            <p className="text-muted-foreground text-sm">Quantidade</p>
            <p className="font-semibold">x{cartProduct.quantity}</p>
          </div>

          <div className="text-right mt-2">
            <p className="text-muted-foreground text-sm">Subtotal</p>
            <p className="font-bold">
              R${" "}
              {(cartProduct.product!.price * cartProduct.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
