import { HTTP_STATUSES } from './constants'

export class ResponseError extends Error {
  constructor(message, status, error) {
    super()
    this.message = message
    this.status = status
    this.error = error
    this.allowSendError = false
  }
  getErrorMessage() {
    return (this.allowSendError) ? this.error : this.message
  }
}

export class ValidationError extends ResponseError {
  constructor(error) {
    super('Validation error', HTTP_STATUSES.BAD_REQUEST, error)
    this.allowSendError = true
  }
}

export class ServerError extends ResponseError {
  constructor(error) {
    super('Server error', HTTP_STATUSES.SERVER_ERROR, error)
  }
}

export class NotFoundError extends ResponseError {
  constructor(error) {
    super('Not found', HTTP_STATUSES.NOT_FOUND, error)
  }
}
