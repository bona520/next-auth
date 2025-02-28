class BaseService {
    private baseUrl = process.env.NEXT_PUBLIC_APP_API;

    constructor(private readonly token?: string) { }

    private async makeRequest<T>(
        endpoint: string,
        method: string,
        data: unknown | null = null
    ): Promise<T> {
        const { signal } = new AbortController();
        const url = `${this.baseUrl}/api/v1/${endpoint}`;
        const options = this.createRequestOptions(method, data, signal);

        try {
            const response = await fetch(url, options);
            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                return this.handleErrorResponse(response, contentType);
            }

            return this.handleSuccessResponse(response, contentType);
        } catch (error) {
            console.error(`Fetch failed for ${method} ${url}:`, error);
            
            if (error instanceof Error) {
                throw new Error(`Fetch failed for ${method} ${url}: ${error.message}`);
            } else {
                throw new Error(`Fetch failed for ${method} ${url}: ${String(error)}`);
            }
        }
    }

    private async handleErrorResponse(response: Response, contentType: string | null): Promise<any> {
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            return {
                ...data,
                status: response.status,
            };
        } else {
            throw new Error(JSON.stringify({
                message: "Server error",
                status: response.status,
                error: response.statusText,
            }));
        }
    }

    private async handleSuccessResponse(response: Response, contentType: string | null): Promise<any> {
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            return {
                ...data,
                status: response.status,
            };
        } else {
            throw new Error("Invalid content type");
        }
    }

    public get<T>(endpoint: string): Promise<T> {
        return this.makeRequest<T>(endpoint, "GET");
    }

    public post<T>(endpoint: string, data: unknown): Promise<T> {
        return this.makeRequest<T>(endpoint, "POST", data);
    }

    public put<T>(endpoint: string, data: unknown): Promise<T> {
        return this.makeRequest<T>(endpoint, "PUT", data);
    }

    public patch<T>(endpoint: string, data: unknown): Promise<T> {
        return this.makeRequest<T>(endpoint, "PATCH", data);
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.makeRequest<T>(endpoint, "DELETE");
    }

    public update<T>(endpoint: string, data: unknown): Promise<T> {
        return this.makeRequest<T>(endpoint, "PUT", data);
    }

    private createRequestOptions(method: string, data: unknown | null, signal: AbortSignal): RequestInit {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
                'api-key': String(process.env.NEXT_PUBLIC_API_KEY)
            },
            signal,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        return options;
    }

    public async updateUploadFile<T>(endpoint: string, data: FormData): Promise<T> {
        const { signal } = new AbortController()
        const url = `${this.baseUrl}/api/${endpoint}`;

        const options: any = {
        	method: "PATCH",
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'api-key': process.env.NEXT_PUBLIC_API_KEY
            },
            body: data,
            signal
        };
        
        try {
            const response = await fetch(url, options);
            const jsonData = await response.json();
            
            return jsonData as T;
        } catch (error) {
            console.error("API Request Error:", error);
            throw error;
        }
    }

    public async uploadFile<T>(endpoint: string, body: FormData): Promise<T> {
        const { signal } = new AbortController()
        const url = `${this.baseUrl}/api/${endpoint}`;

        const options: any = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'api-key': process.env.NEXT_PUBLIC_API_KEY
            },
            body,
            signal
        };

        try {
            const response = await fetch(url, options);
            const jsonData = await response.json();

            return jsonData as T;
        } catch (error) {
            console.error("API Request Error:", error);
            throw error;
        }
    }
}

export default BaseService;