const codes = [
  {
    code: 200,
    message: "OK",
  },
  {
    code: 201,
    message: "CREATED",
  },
  {
    code: 400,
    message: "BAD_REQUEST",
  },
  {
    code: 401,
    message: "UNAUTHORIZED",
  },
  {
    code: 404,
    message: "NOT_FOUND",
  },
  {
    code: 403,
    message: "FORBIDDEN",
  },
  {
    code: 405,
    message: "METHOD_NOT_ALLOWED",
  },
  {
    code: 408,
    message: "REQUEST_TIMEOUT",
  },
  {
    code: 500,
    message: "INTERNAL_SERVER_ERROR",
  },
  {
    code: 501,
    message: "NOT_IMPLEMENTED",
  },
  {
    code: 502,
    message: "BAD_GATEWAY",
  },
  {
    code: 503,
    message: "SERVICE_UNAVAILABLE",
  },
];

const responseHandler = {
  success: (responseMessage: string, statusCode: number, data?: any) => {
    return {
      responseMessage,
      status: true,
      responseCode: statusCode,
      data,
    };
  },
  failed: (responseMessage: string, statusCode: number, errors: any) => {
    const findCode = codes.find((http) => http.code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode.code;

    return {
      responseMessage,
      status: false,
      responseCode: statusCode,
      errors,
    };
  },
};

export default responseHandler;
