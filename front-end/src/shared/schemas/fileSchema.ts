import z from "zod";

export const fileSchema = z.object({
  display_filename: z.string(),
  base64: z.string(),
  mimeType: z.string().optional(),
});

export type FileSchema = z.infer<typeof fileSchema>;
