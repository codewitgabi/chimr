import ProductList from "./ProductList";
import ProductSearchForm from "./ProductSearchForm";

function ProductContent() {
  return (
    <div className="flex-1 overflow-y-auto col-span-3 max-[960px]:col-span-2 max-md:col-span-3 flex flex-col gap-4">
      <ProductSearchForm />

      <div className="grow overflow-y-auto flex flex-col">
        <ProductList />
      </div>
    </div>
  );
}

export default ProductContent;
