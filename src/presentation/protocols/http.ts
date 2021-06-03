export interface HttpResponse {
  statusCode: number
  body: any
}

export interface httpRequest <T> {
  body?: T
}
