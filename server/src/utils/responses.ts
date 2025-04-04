interface ISuccessResponse {
  status: "success" | "error";
  message: string;
  data: unknown;
}

export const SuccessResponse: ISuccessResponse = {
    status: "success",
    message: "Hello world",
    data: {}
};

export const ErrorResponse = {};
