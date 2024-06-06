type HttpErrorMessage = {
    [StatusCodes.BAD_REQUEST]: string;
    [StatusCodes.UNAUTHORIZED]: string;
    [StatusCodes.FORBIDDEN]: string;
    [StatusCodes.NOT_FOUND]: string;
    [StatusCodes.INTERNAL_SERVER_ERROR]: string;
    [StatusCodes.SERVICE_UNAVAILABLE]?: string;
};