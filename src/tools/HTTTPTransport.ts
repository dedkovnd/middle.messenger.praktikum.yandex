enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
    data?: any;
    timeout?: number
};


type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export class HTTPTransport {
    private apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `local${apiPath}`;
    }

    get: HTTPMethod = (url, options ) => (
        this.request(url, {...options, method: METHOD.GET}, options?.timeout)
      )
      
    put: HTTPMethod = (url, options ) => (
        this.request(url, {...options, method: METHOD.PUT}, options?.timeout)
      )
      
    post: HTTPMethod = (url, options ) => (
        this.request(url, {...options, method: METHOD.POST}, options?.timeout)
      )

    delete: HTTPMethod = (url, options ) => (
        this.request(url, {...options, method: METHOD.DELETE}, options?.timeout)
      )

    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }, timeout: any): Promise<TResponse> {
        const {method, data} = options;

        const response = await fetch(url, {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: data ? JSON.stringify(data) : null,
        });
        
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const resultData = await isJson ? response.json() : null

        return resultData as unknown as TResponse;
    };
}
