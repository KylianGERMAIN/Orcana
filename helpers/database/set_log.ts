import { ErrorResponse } from "../interface/errorInterface";
import { HttpInfo, QueryContent } from "../interface/logInterface";
import { LogModel } from "../models/logModel";

export async function set_log(
    time: Date,
    user_id: string | undefined,
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
