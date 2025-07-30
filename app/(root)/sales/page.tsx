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
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">銷售紀錄</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
