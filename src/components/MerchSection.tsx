import { useState } from 'react';
import type { MerchProduct } from '../types';

interface MerchSectionProps {
  products: MerchProduct[];
  cartCount: number;
  onAddToCart: (product: MerchProduct, size: string) => void;
  onOpenCart: () => void;
  onNotifyStock: (productName: string) => void;
}

export function MerchSection({
  products,
  cartCount,
  onAddToCart,
  onOpenCart,
  onNotifyStock,
}: MerchSectionProps) {
  // Store selected size per product id
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'merch-hoodie-black': 'M',
    'merch-tshirt-orange': 'L',
    'merch-cap-black': 'ÚNICO',
    'merch-vinyl-shadows': '12" VINYL',
    'merch-stickers': 'PACK X10',
    'merch-tote-bag': 'ÚNICO',
  });

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section
      id="merch"
      className="w-full bg-[#131313] px-4 md:px-8 lg:px-12 py-20 border-t border-[#353534]/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs text-[#FF5722] uppercase tracking-widest font-semibold">
              SHOP · LIMITED EDITIONS
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl uppercase text-[#E5E2E1] tracking-tight mt-1">
              MERCH OFICIAL
            </h2>
            <p className="font-body text-sm text-[#C7C6C6] mt-1">
              Drops limitados diseñados con corte editorial. Solo para verdaderos ravers.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="px-5 py-2.5 bg-[#2A2A2A] text-[#E5E2E1] font-badge text-lg tracking-wider uppercase hover:bg-[#353534] transition-colors flex items-center gap-2 shadow-sm self-start md:self-auto border border-white/5"
          >
            <span className="material-symbols-outlined text-[20px]">
              shopping_bag
            </span>
            <span>VER MI BOLSO ({cartCount})</span>
          </button>
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const currentSize =
              selectedSizes[product.id] || product.availableSizes[0] || 'M';

            return (
              <div
                key={product.id}
                className={`bg-[#1C1B1B] p-4 flex flex-col justify-between border border-white/5 shadow-md hover:border-[#FF5722]/30 transition-all ${
                  !product.isAvailable ? 'opacity-80' : ''
                }`}
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-[#201F1F] overflow-hidden mb-4">
                  <div
                    className="bg-cover bg-center absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.imageUrl}')` }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        product.badge === 'SOLD OUT'
                          ? 'bg-[#E53935] text-white'
                          : product.badge === 'NEW DROP'
                          ? 'bg-[#FF5722] text-[#0A0A0A]'
                          : product.badge === 'EXCLUSIVE'
                          ? 'bg-[#76FF03] text-[#0A0A0A]'
                          : 'bg-[#353534] text-[#FF5722]'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline text-2xl uppercase text-[#E5E2E1]">
                      {product.name}
                    </h3>
                    <span className="font-headline text-2xl text-[#FF5722]">
                      ${product.priceUsd} USD
                    </span>
                  </div>

                  <p className="font-body text-xs text-[#C7C6C6] leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Size Selectors */}
                  <div className="flex items-center gap-1.5 mt-3 mb-4">
                    {product.availableSizes.map((size) => {
                      const isSelected = currentSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          disabled={!product.isAvailable}
                          onClick={() => handleSelectSize(product.id, size)}
                          className={`h-8 px-2.5 font-mono text-xs transition-colors ${
                            isSelected && product.isAvailable
                              ? 'bg-[#FF5722] text-[#0A0A0A] font-bold'
                              : 'bg-[#2A2A2A] text-[#C7C6C6] hover:bg-[#353534]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add to Cart or Sold Out Button */}
                  {product.isAvailable ? (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product, currentSize)}
                      className="w-full py-3 bg-[#FF5722] text-[#0A0A0A] font-badge text-lg tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-bold shadow-md"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        add_shopping_cart
                      </span>
                      <span>AGREGAR AL CARRITO</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNotifyStock(product.name)}
                      className="w-full py-3 bg-[#2A2A2A] text-[#C7C6C6] hover:text-[#E5E2E1] hover:bg-[#353534] font-badge text-base tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      <span>NOTIFICARME CUANDO HAYA STOCK</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
