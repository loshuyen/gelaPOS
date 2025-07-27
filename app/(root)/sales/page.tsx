import { getAllSales } from "@/actions/sales";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

export default async function SalesPage() {
  const sales = await getAllSales();
  const data = sales.map((sale) => {
    return {
      id: sale.id,
      total_price: sale.total_price,
      total_quantity: sale.total_quantity,
      pay_method: sale.pay_method,
      user_name: sale.profiles.name || sale.profiles.email || "",
      created_at: sale.created_at,
    };
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
