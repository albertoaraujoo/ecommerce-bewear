import Image from "next/image";

import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="space-y-6">
        <div className="relative px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
          <Button
            className="hover: absolute bottom-4 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-3xl bg-white/45 px-7 py-1 text-white hover:bg-white/75 hover:text-gray-700"
            size="lg"
          >
            Comprar
          </Button>
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="relative px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
          <Button
            className="hover: absolute bottom-4 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-3xl bg-white/45 px-7 py-1 text-white hover:bg-white/75 hover:text-gray-700"
            size="lg"
          >
            Comprar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
