import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/Error/error";
import { LogModel } from "../../../helpers/models/logModel";
import { Log } from "./log";

export async function find_logs(classLog: Log) {
    await LogModel.find({})
        .then((docs: any) => {
            classLog.v_log_length = docs.length;
            classLog.v_operation_names = docs;
        })
        .catch((e) => {
            console.log(e);
            throw new GraphQLError(CustomErrorMessage.FIND_DATABASE, {
                extensions: {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                },
            });
        });
}
