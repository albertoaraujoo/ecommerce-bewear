import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    id: 1,
    name: "Nike",
    src: "brand-icons/simple-icons-nike.svg",
  },
  {
    id: 2,
    name: "Adidas",
    src: "brand-icons/simple-icons-adidas.svg",
  },
  {
    id: 3,
    name: "Puma",
    src: "brand-icons/simple-icons-puma.svg",
  },
  {
    id: 4,
    name: "New Balance",
    src: "brand-icons/simple-icons-newbalance.svg",
  },
  {
    id: 5,
    name: "Converse",
    src: "brand-icons/simple-icons-converse.svg",
  },
  {
    id: 6,
    name: "Polo",
    src: "brand-icons/simple-icons-polo.svg",
  },
  {
    id: 7,
    name: "Zara",
    src: "brand-icons/simple-icons-zara.svg",
  },
];

const BrandList = () => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-xl font-semibold">Marcas parceiras</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 pb-10 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center gap-4">
            <Link
              href="/"
              className="flex h-20 flex-col items-center justify-center gap-4 rounded-4xl border-1 border-gray-300 px-7 py-13"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={50}
                height={50}
                className="min-h-[50px] min-w-[50px]"
              />
            </Link>

            <div className="flex max-w-[200px] flex-col gap-1">
              <p className="text-md truncate font-semibold">{brand.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
