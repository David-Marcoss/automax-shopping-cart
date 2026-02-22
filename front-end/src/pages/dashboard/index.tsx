import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

import type { ICart } from "@/shared/interfaces/carts/ICarts";
import { CartService } from "@/shared/services/carts";

export default function DashboardPage() {
  const [carts, setCarts] = useState<ICart[]>([]);
  const [filteredCarts, setFilteredCarts] = useState<ICart[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CartService.findAll()
      .then((result) => {
        if (result.data && result.statusCode === 200) {
          setCarts(result.data);
          setFilteredCarts(result.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = carts.filter((cart) =>
      cart.userId.toString().includes(search),
    );
    setFilteredCarts(filtered);
  }, [search, carts]);

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-8 h-8" />
            Carrinhos de Compras
          </h1>

          <div className="flex gap-2">
            <Input
              placeholder="Buscar por ID do usuário..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            <Button variant="outline" onClick={() => setSearch("")}>
              Limpar
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCarts.map((cart) => (
              <motion.div
                key={cart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                      <span className="font-medium">Usuário:</span>{" "}
                      {cart.userId}
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
