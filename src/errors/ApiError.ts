class ApiError extends Error {
  status: number = 0;
  errors: any[] = [];

  constructor(status: number, message: string, errors: any[] = []) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(message: string, errors: any[] = []) {
    return new ApiError(404, message, errors);
  }

  static internal(message: string) {
    return new ApiError(500, message);
  }

  static forbidden(message: string) {
    return new ApiError(403, message);
  }
}

export default ApiError;
