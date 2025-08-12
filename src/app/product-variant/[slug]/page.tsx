import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatPrice } from "@/utils/formatPrice";

import AddToCartButton from "./components/add-to-cart-button";
import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* Image */}
      <Image
        src={productVariant.imageUrl}
        alt={productVariant.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full"
      />

      {/* Variants cards */}
      <div className="px-5">
        <VariantSelector
          selectedVariantSlug={productVariant.slug}
          variants={productVariant.product.variants}
        />
      </div>

      {/* Product Info */}
      <div className="px-5">
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatPrice(productVariant.priceInCents)}
        </h3>
      </div>

      <ProductActions productVariantId={productVariant.id} />

      {/* Product Description */}
      <div className="px-5 py-3">
        <p className="text-shadow-amber-600">
          {productVariant.product.description}
        </p>
      </div>

      <ProductList title="Você também pode gostar" products={likelyProducts} />
    </div>
  );
};

export default ProductVariantPage;
