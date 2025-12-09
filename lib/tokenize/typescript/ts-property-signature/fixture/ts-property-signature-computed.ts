const StatusCodes = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
}

type HttpErrorMessage = {
    [StatusCodes.BAD_REQUEST]: string;
    [StatusCodes.UNAUTHORIZED]: string;
    [StatusCodes.FORBIDDEN]: string;
    [StatusCodes.NOT_FOUND]: string;
    [StatusCodes.INTERNAL_SERVER_ERROR]: string;
    [StatusCodes.SERVICE_UNAVAILABLE]?: string;
};