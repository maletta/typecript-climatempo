// biblioteca para transformar os códigos http em string para mapear erros
import httpsStatusCodes from 'http-status-codes';

export interface APIError {
  message: string;
  code: number;
  codeAsString?: string;
  description?: string;
  documentation?: string;
}

export interface APIErrorResponse extends Omit<APIError, 'codeAsString'> {
  error: string;
}

export default class ApiError {
  public static format(error: APIError): APIErrorResponse {
    return {
      ...{
        message: error.message,
        code: error.code,
        error: error.codeAsString
          ? error.codeAsString
          : httpsStatusCodes.getStatusText(error.code),
      },
      ...(error.documentation && { documentation: error.documentation }), // só add objeto por merge se ele existir
      ...(error.description && { description: error.description }), // só add objeto por merge se ele existir
    };
  }
}
