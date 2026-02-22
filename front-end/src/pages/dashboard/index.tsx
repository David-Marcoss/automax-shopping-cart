import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import type { IOltInfos } from "@/shared/interfaces/oltInfos";
import { OltInfosService } from "@/shared/services/oltInfosService";
import { OltInfosTable } from "./components/oltInfosTable";
import { Card, CardContent } from "@/components/ui/card";
import { OltInfosModal } from "./components/oltInfosModal";
import type { IMetaPagination } from "@/shared/interfaces/response/IMetaPagination";
import { SimplePagination } from "@/components/pagination/pagination";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const [oltInfos, setOltInfos] = useState<IOltInfos[]>([]);
  const [metaPagination, setMetaPagination] = useState<IMetaPagination>();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const oltType = useMemo(
    () => searchParams.get("oltType") || "",
    [searchParams]
  );

  const state = useMemo(() => searchParams.get("state") || "", [searchParams]);

  const page = useMemo(() => searchParams.get("page") || "1", [searchParams]);

  const handleGetOltsData = useCallback(() => {
    OltInfosService.findAll({ search, page, oltType, state }).then((result) => {
      if (result.statusCode === 200 && result.data?.data) {
        setOltInfos(result.data.data);
        setMetaPagination(result.data.meta);
      }
    });
  }, [page, search, oltType, state]);

  useEffect(() => {
    handleGetOltsData();
  }, [handleGetOltsData]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Network Logs</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Search</label>
            <Input
              placeholder="Device SN ..."
              className="min-w-[200px]"
              onChange={(e) =>
                setSearchParams({ page: "1", search: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Select
              onValueChange={(value) => {
                setSearchParams({ page: "1", search, oltType: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900">
                <SelectItem value="HUAWEI">HUAWEI</SelectItem>
                <SelectItem value="ZTE">ZTE</SelectItem>
                <SelectItem value="ZTE_STATE">ZTE_STATE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Select
              onValueChange={(value) => {
                setSearchParams({ page: "1", search, oltType, state: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900">
                <SelectItem value="ONLINE">online</SelectItem>
                <SelectItem value="OFFLINE">offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <OltInfosModal
            onCreateData={async () => {
              await handleGetOltsData();
            }}
          />
        </CardContent>
      </Card>

      {/* Tabela */}
      <OltInfosTable data={oltInfos} />

      {/* Paginação */}
      <div className="flex justify-center py-6">
        {metaPagination && metaPagination.total > metaPagination.perPage && (
          <SimplePagination {...metaPagination} />
        )}
      </div>
    </div>
  );
}
