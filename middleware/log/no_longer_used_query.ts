import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { Log } from "./log_class/log";

export async function logs_statistic(
    month: number,
    year: number,
    day: number,
    level: string
) {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };

    const log = new Log();

    try {
        if (year) {
            await log.find_logs_with_date(log, month, year, day, level);
        } else {
            await log.find_logs(log);
        }
    } catch (e: any) {
        _error = e;
    }
    return {
        error: _error,
        total_request: log.v_log_length,
        operationName: log.v_operation_names,
    };
}
