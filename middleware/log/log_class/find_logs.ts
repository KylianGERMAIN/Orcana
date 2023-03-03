import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../../../helpers/error/error";
import { log_model } from "../../../helpers/models/log_model";
import { Log } from "./log";

export async function find_logs(classLog: Log) {
    await log_model
        .find({})
        .then((docs: any) => {
            classLog.v_log_length = docs.length;
            classLog.v_operation_names = docs;
        })
        .catch(() => {
            throw new GraphQLError(CustomErrorMessage.FIND_DATABASE, {
                extensions: {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                },
            });
        });
}

export async function find_logs_with_date(
    classLog: Log,
    month: number,
    year: number,
    day: number,
    level: string
) {
    await log_model
        .find(
            month == undefined
                ? level == undefined
                    ? {
                          timestamp: {
                              $gte: new Date(year, 0, 2).toISOString(),
                              $lt: new Date(year, 11, 32).toISOString(),
                          },
                      }
                    : {
                          timestamp: {
                              $gte: new Date(year, 0, 2).toISOString(),
                              $lt: new Date(year, 11, 32).toISOString(),
                          },
                          level: {
                              $eq: level,
                          },
                      }
                : day == undefined
                ? level == undefined
                    ? {
                          timestamp: {
                              $gte: new Date(year, month - 1, 1).toISOString(),
                              $lt: new Date(year, month, 1).toISOString(),
                          },
                      }
                    : {
                          timestamp: {
                              $gte: new Date(year, month - 1, 1).toISOString(),
                              $lt: new Date(year, month, 1).toISOString(),
                          },
                          level: {
                              $eq: level,
                          },
                      }
                : level == undefined
                ? {
                      timestamp: {
                          $gte: new Date(year, month - 1, day).toISOString(),
                          $lt: new Date(year, month - 1, day + 1).toISOString(),
                      },
                  }
                : {
                      timestamp: {
                          $gte: new Date(year, month - 1, day).toISOString(),
                          $lt: new Date(year, month - 1, day + 1).toISOString(),
                      },
                      level: {
                          $eq: level,
                      },
                  }
        )
        .then((docs: any) => {
            classLog.v_log_length = docs.length;
            classLog.v_operation_names = docs;
        })
        .catch(() => {
            throw new GraphQLError(CustomErrorMessage.FIND_DATABASE, {
                extensions: {
                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                },
            });
        });
}
