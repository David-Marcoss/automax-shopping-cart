import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fileSchema } from "@/shared/schemas/fileSchema";
import { OltInfosService } from "@/shared/services/oltInfosService";
import { useToast } from "@/shared/hooks/use-toast";

export type oltType = "HUAWEI" | "ZTE" | "ZTE_STATE";

export interface IFile {
  display_filename: string;
  mimeType?: string;
  base64: string;
}

export interface ICreateOltInfos {
  oltFile: IFile;
  oltType: oltType;
}

const createOltInfosSchema = z.object({
  oltType: z.enum(["HUAWEI", "ZTE", "ZTE_STATE"], {
    required_error: "Selecione o tipo de OLT",
  }),
  oltFile: fileSchema,
});

type CreateOltInfosFormData = z.infer<typeof createOltInfosSchema>;

interface IOltInfosModalProps {
  onCreateData: () => Promise<void>;
}

export function OltInfosModal({ onCreateData }: IOltInfosModalProps) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<CreateOltInfosFormData>({
    resolver: zodResolver(createOltInfosSchema),
  });

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      const fileData = {
        display_filename: file.name,
        base64: base64String,
        mimeType: file.type,
      };

      setValue("oltFile", fileData, { shouldValidate: true });
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onSubmit = async (data: CreateOltInfosFormData) => {
    const { oltFile, oltType } = data;
    if (oltFile.mimeType && !oltFile.mimeType.startsWith("text/plain")) {
      setError("oltFile", { message: "Tipo de arquivo invalido!" });
      return;
    }

    const createInfos: ICreateOltInfos = {
      oltType,
      oltFile,
    };

    const result = await OltInfosService.create(createInfos);

    if (result.statusCode === 201) {
      toast({
        title: "Sucesso",
        description: "Registro criado com sucesso.",
        variant: "success",
      });

      await onCreateData();

      setOpen(false);
      reset();

      return;
    }

    toast({
      title: "Houve um erro ao processar os dados",
      description:
        "Verifique se preencheu os dados com o tipo correto e tente novamente.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
          Upload Logs
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Log File</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 py-4"
        >
          {/* Tipo de OLT */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Tipo de OLT</label>
            <Select
              onValueChange={(value) => {
                setValue("oltType", value as oltType);
                clearErrors("oltType");
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
            {errors.oltType && (
              <p className="text-xs text-red-500">{errors.oltType.message}</p>
            )}
          </div>

          {/* Upload de arquivo */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Arquivo (.txt)</label>
            <Input
              type="file"
              accept=".txt"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleFileChange(e);
              }}
            />
            {errors.oltFile && (
              <p className="text-xs text-red-500">{errors.oltFile.message}</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Apenas arquivos de texto (.txt) são aceitos.
          </p>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
