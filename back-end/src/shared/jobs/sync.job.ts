import cron from "node-cron";
import { SyncDataBase } from "../service/syncDatabaseWithFakeStoreApi";

export async function startCronJobs() {
  // Executa imediatamente
  console.log("Executando sincronização inicial...");
  await SyncDataBase.syncCartsDataWithExternalApi();

  // Agenda execuções futuras
  cron.schedule("*/10 * * * *", async () => {
    console.log("Executando sincronização agendada...");
    await SyncDataBase.syncCartsDataWithExternalApi();
  });
}
