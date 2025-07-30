import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Product } from "@/types/product";

export function ActiveProduct({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="text-lg">{product.name}</TableCell>
            <TableCell className="text-lg">{`$${product.price}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
