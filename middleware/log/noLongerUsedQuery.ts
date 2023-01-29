import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { LogModel } from "../../helpers/models/logModel";

export async function noLongerUsedQuery() {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };

    let totalRequest = 0;

    try {
        LogModel.count({}, function (err: any, count: number) {
            totalRequest = count;
        });
        const infos = await LogModel.find({});
        console.log(infos);
        // In progress
    } catch (e: any) {
        _error = e;
    }
    return {
        error: _error,
        totalRequest: totalRequest,
    };
}
