export interface ISuccessResponse {
  status: "success";
  message: string;
  data: unknown;
  httpStatus: number;
}

export interface IErrorResponse {
    status: "error";
    message: string;
    trace: string | null;
    httpStatus: number;
}
