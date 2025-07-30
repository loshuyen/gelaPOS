import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Flavor } from "@/types/product";

export function ActiveFlavor({ flavors }: { flavors: Flavor[] }) {
  return (
    <Table>
      <TableBody>
        {flavors.map((flavor) => (
          <TableRow key={flavor.id}>
            <TableCell className="text-lg">{flavor.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
