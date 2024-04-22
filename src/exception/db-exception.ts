import type { Response } from 'express';

export class ErrorHandler {
  private error;

  constructor(error: any) {
    this.error = error;
  }

  isDatabaseError() {
    return (
      'code' in this.error &&
      typeof this.error.code === 'string' &&
      this.error.code.length === 5 &&
      ['23505', '23502', '23503', '22P02'].includes(this.error.code)
    );
  }

  generateUserFriendlyMessage() {
    if ('code' in this.error) {
      switch (this.error.code) {
        case '23505':
          return 'Resource already exists';
        case '23502':
          return 'Resource is missing required fields';
        case '23503':
          return 'Resource does not exist';
        case '22P02':
          return 'Invalid input for resource';
        default:
          return 'An error occurred';
      }
    }
  }

  logError() {
    console.error(`Error: ${JSON.stringify(this.error, null, 2)}`);
  }

  sendResponse(response: Response) {
    return response.status(400).send({ error: this.generateUserFriendlyMessage() });
  }
}
