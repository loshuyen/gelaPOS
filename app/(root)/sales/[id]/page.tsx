import { getSaleById } from "@/actions/sales";
import { SaleTable } from "./SaleTable";
import { columns } from "./columns";

interface SaleDetailPageProps {
  params: { id: number };
}

const SaleDetailPage = async ({ params }: SaleDetailPageProps) => {
  const { id } = await params;

  const sales = await getSaleById(Number(id));
  const data = sales.map((sale) => {
    return {
      saleId: sale.sales.id,
      name: sale.products.name,
      price: sale.price,
      quantity: sale.quantity,
      flavors: sale.flavors,
    };
  });

  return <SaleTable columns={columns} data={data} />;
};

export default SaleDetailPage;
