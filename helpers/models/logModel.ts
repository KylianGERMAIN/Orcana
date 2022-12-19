import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QueryLogSchema = new Schema(
  {
    operationName: {
      type: String,
    },
    query: {
      type: String,
    },
  },
  { _id: false }
);

const ErrorExtensionsLogSchema = new Schema(
  {
    status: {
      type: String,
    },
    error: {
      type: String,
    },
    field: {
      type: String,
    },
  },
  { _id: false }
);

const ErrorLogSchema = new Schema(
  {
    message: {
      type: String,
    },
    extensions: {
      type: ErrorExtensionsLogSchema,
    },
  },
  { _id: false }
);

const OperationLogSchema = new Schema(
  {
    query_execution_time: {
      type: String,
      required: true,
    },
    query: {
      type: QueryLogSchema,
      required: true,
    },
    error: {
      type: ErrorLogSchema,
      required: true,
    },
  },
  { _id: false }
);

const HttpInfoLogSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
    method: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const detailLogSchema = new Schema(
  {
    operation: {
      type: OperationLogSchema,
      required: true,
    },
    http_info: {
      type: HttpInfoLogSchema,
      required: true,
    },
  },
  { _id: false }
);

export const GlobalLogSchema = new Schema(
  {
    timestamp: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    detail: {
      type: detailLogSchema,
      required: true,
    },
  },
  { timestamps: false, _id: true }
);

export const LogModel = mongoose.model("log", GlobalLogSchema);
