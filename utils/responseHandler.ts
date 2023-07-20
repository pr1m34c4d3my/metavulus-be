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
    message: "BAD REQUEST",
  },
  {
    code: 401,
    message: "UNAUTHORIZED",
  },
  {
    code: 404,
    message: "NOT FOUND",
  },
  {
    code: 403,
    message: "FORBIDDEN",
  },
  {
    code: 405,
    message: "METHOD NOT ALLOWED",
  },
  {
    code: 408,
    message: "REQUEST TIMEOUT",
  },
  {
    code: 500,
    message: "INTERNAL SERVER ERROR",
  },
  {
    code: 501,
    message: "NOT IMPLEMENTED",
  },
  {
    code: 502,
    message: "BAD GATEWAY",
  },
  {
    code: 503,
    message: "SERVICE UNAVAILABLE",
  },
];

const responseHandler = {
  success: (statusCode: number, data?: any) => {
    const findCode = codes.find((http) => http.code == statusCode);
    const responseMessage = findCode
      ? findCode.message
      : "INTERNAL_SERVER_ERROR";
    return {
      responseMessage,
      responseCode: statusCode,
      data,
    };
  },
  failed: (statusCode: number, errorMessage: any) => {
    const findCode = codes.find((http) => http.code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode.code;
    if (errorMessage.code === 11000) {
      errorMessage = `${Object.keys(errorMessage.keyValue)[0]} Already Used`;
    }

    const responseMessage = findCode
      ? findCode.message
      : "INTERNAL_SERVER_ERROR";

    return {
      responseMessage,
      responseCode: statusCode,
      errorMessage,
    };
  },
};

export default responseHandler;
