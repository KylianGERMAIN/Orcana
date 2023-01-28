import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { LogModel } from "../../helpers/models/logModel";

export async function setLog(
  time: Date,
  user_id: string,
  level: string,
  error: ErrorResponse,
  query: QueryContent,
  http_info: HttpInfo
) {
  const end: any = new Date().getTime() - time.getTime();
  const log = await new LogModel({
    timestamp: new Date().toISOString(),
    user_id: user_id,
    level: level,
    detail: {
      operation: {
        query_execution_time: `${end / 1000}s`,
        query,
        error,
      },
      http_info,
    },
  });
  await log.save();
}
