export class HelperService {
  createResponse(data?: any) {
    return { data: data, code: 200, statusCode: 200 };
  }
}
