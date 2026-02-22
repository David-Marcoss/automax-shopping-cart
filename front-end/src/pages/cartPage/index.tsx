import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { ICart } from "@/shared/interfaces/carts/ICarts";
import { CartService } from "@/shared/services/carts";
import { useToast } from "@/shared/hooks/use-toast";

export default function CartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    async function fetchCart() {
      try {
        if (!id) return;
        const response = await CartService.findOne(id);
        if (response.data && response.statusCode === 200) {
          const data = response.data;
          setCart(data);
        } else {
          toast({
            title: "Erro ao buscar dado",
            description: "Carrinho não encontado",
            variant: "destructive",
          });
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [id]);

  const total = useMemo(() => {
    if (!cart?.products) return 0;
    return cart.products.reduce(
      (acc, item) => acc + item.product!.price * item.quantity,
      0,
    );
  }, [cart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Carrinho não encontrado.</p>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-xl">
              Carrinho #{cart.id}
              <Badge variant="secondary">
                {cart.products ? cart.products.length : 0} itens
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <p>
                <span className="font-medium">Usuário:</span> {cart.userId}
              </p>
              <p>
                <span className="font-medium">Data:</span>{" "}
                {new Date(cart.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Criado em:</span>{" "}
                {new Date(cart.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Atualizado em:</span>{" "}
                {new Date(cart.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="md:col-span-2 flex items-end justify-end">
              <div className="text-right">
                <p className="text-muted-foreground">Total do Carrinho</p>
                <p className="text-2xl font-bold">R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {cart.products &&
            cart.products.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 grid md:grid-cols-4 gap-6">
                    <div className="flex items-center justify-center">
                      <img
                        src={item.product!.image}
                        alt={item.product!.title}
                        className="h-32 object-contain"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <h3 className="font-semibold text-base">
                        {item.product!.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {item.product!.description}
                      </p>
                      <Badge variant="outline">{item.product!.category}</Badge>
                    </div>

                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">Preço</p>
                        <p className="font-semibold">
                          R$ {item.product!.price.toFixed(2)}
                        </p>
                      </div>

                      <Separator className="my-2" />

                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">
                          Quantidade
                        </p>
                        <p className="font-semibold">x{item.quantity}</p>
                      </div>

                      <div className="text-right mt-2">
                        <p className="text-muted-foreground text-sm">
                          Subtotal
                        </p>
                        <p className="font-bold">
                          R$ {(item.product!.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
