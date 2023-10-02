export class ErrorHandling {
  public static errorHandling(error: Error) {
    const exceptionMessage = new Error(`
============  ============  TEST FAILED ============  ============
Test execution failed!!!

ERROR TYPE: ${error.name}

MESSAGE: ${error.message}

STACK TRACE: ${error.stack}
============  ============  =========== ============  ============`);

    throw exceptionMessage;
  }
}
