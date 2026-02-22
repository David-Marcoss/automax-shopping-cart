import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IOltInfos } from "@/shared/interfaces/oltInfos";

interface IOltInfosProps {
  data: IOltInfos[];
}

export const OltInfosTable = ({ data }: IOltInfosProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ont_id</TableHead>
              <TableHead>Tipo de Olt</TableHead>
              <TableHead>SN</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Porta</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.ont_id}</TableCell>
                <TableCell>{item.oltType}</TableCell>
                <TableCell>{item.sn ?? "-"}</TableCell>
                <TableCell>{item.slot}</TableCell>
                <TableCell>{item.port}</TableCell>
                <TableCell>
                  <span
                    className={
                      item.state
                        ? item.state === "ONLINE"
                          ? "bg-green-500 rounded-md p-1 w-10"
                          : "bg-red-500 rounded-md p-1 w-10"
                        : ""
                    }
                  >
                    {item.state ?? "-"}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="h-[300px] flex flex-col items-center justify-center text-center text-gray-500">
                    <h3 className="text-lg font-semibold mb-1">
                      Ainda não há itens cadastrados
                    </h3>
                    <p>Faça o upload dos arquivos para exibir os dados.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
