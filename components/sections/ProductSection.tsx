import ProductContent from "../ui/product/ProductContent";
import ProductFilterContent from "../ui/product/ProductFilterContent";

function ProductSection() {
  return (
    <section className="grid grid-cols-4 max-[960px]:grid-cols-3 gap-8 max-md:gap-4 flex-1 overflow-hidden mt-4">
      <ProductContent />

      <ProductFilterContent />
    </section>
  );
}

export default ProductSection;
