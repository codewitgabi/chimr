import ProtectedLayout from "@/components/layouts/ProtectedLayout";
import ProductSection from "@/components/sections/ProductSection";
import Header from "@/components/ui/navbar/Header";
import Sidebar from "@/components/ui/navbar/Sidebar";

function Page() {
  return (
    <ProtectedLayout>
      <div className="flex h-dvh w-full">
        <Sidebar />

        <div className="flex-1 h-dvh overflow-hidden p-4 flex flex-col">
          <Header title="Products" />

          <ProductSection />
        </div>
      </div>
    </ProtectedLayout>
  );
}

export default Page;
