import { find_logs, find_logs_with_date } from "./find_logs";

export class Log {
    private log_length = 0;
    private operation_names: string[] = [];

    public set v_log_length(value: number) {
        this.log_length = value;
    }
    public get v_log_length(): number {
        return this.log_length;
    }

    public set v_operation_names(docs: any) {
        for (let i = 0; i != this.log_length; i++) {
            this.operation_names.push(
                docs[i].detail.operation.query.operationName
            );
        }
    }
    public get v_operation_names() {
        return this.operation_names;
    }

    public find_logs_with_date = find_logs_with_date;
    public find_logs = find_logs;
}
