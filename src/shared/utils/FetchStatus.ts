export default class FetchStatus {
  code;
  message;
  statusCode;
  hasData;
  responseTime;
  requestId;

  constructor(
    status: "INIT" | "LOADING" | "SUCCESS" | "ERROR",
    message?: string,
    statusCode?: number,
    responseTime?: number,
    requestId?: string,
    hasData?: boolean,
  ) {
    this.code = status;
    this.message = message || "";
    this.statusCode = statusCode || 0;
    this.hasData = hasData || false;
    this.responseTime = responseTime || 0;
    this.requestId = requestId;
  }

  get isInit() {
    return this.code === "INIT";
  }

  get isLoading() {
    return this.code === "LOADING";
  }

  get isError() {
    return this.code === "ERROR";
  }

  get isSuccess() {
    return this.code === "SUCCESS";
  }

  clone(
    status = this.code,
    message = this.message,
    statusCode = this.statusCode,
    responseTime = this.responseTime,
    requestId = this.requestId,
    hasData = false,
  ) {
    return new FetchStatus(
      status === undefined ? this.code : status,
      message === undefined ? this.message : message,
      statusCode === undefined ? this.statusCode : statusCode,
      responseTime === undefined ? this.responseTime : responseTime,
      requestId === undefined ? this.requestId : requestId,
      hasData === undefined ? this.hasData : hasData,
    );
  }

  toString() {
    return this.code;
  }
}
