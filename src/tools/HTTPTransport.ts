export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method?: METHOD;
    data?: any;
};


type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export class HTTPTransport {
  private apiUrl : string
    constructor(apiPath :string) {
        this.apiUrl = apiPath;
    }
    
    get: HTTPMethod = (url, options) => (
        this.request(this.apiUrl + url, {...options, method: METHOD.GET})
      )

      
    put: HTTPMethod = (url, options ) => (
        this.request(this.apiUrl + url, {...options, method: METHOD.PUT})
      )
      
    post: HTTPMethod = (url, options ) => (
        this.request(this.apiUrl + url, {...options, method: METHOD.POST})
      )

    delete: HTTPMethod = (url, options ) => (
        this.request(this.apiUrl + url, {...options, method: METHOD.DELETE})
      )
    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }, ): Promise<TResponse> {
        let  {method, data} = options;
        let includeHeaders = true;
        if (data instanceof FormData) {
          includeHeaders = false;
        } else {
          data = JSON.stringify(data)
        }

        const response = await fetch(url, {
          method,
          credentials: 'include',
          mode: 'cors',
          headers: includeHeaders ? {'content-type': 'application/json'} : undefined,
          body: data,
        });
        
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const resultData = await isJson ? response.json() : null

        return resultData as unknown as TResponse;
    };
}
