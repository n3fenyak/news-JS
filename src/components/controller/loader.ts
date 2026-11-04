import type { ApiCallback, RequestConfig, RequestOptions } from '../../types/news';

class Loader {
    private readonly baseLink: string;
    private readonly options: RequestOptions;

    public constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: ApiCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const url = new URL(endpoint, this.baseLink);
        const urlOptions: RequestOptions = { ...this.options, ...options };

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, value);
            }
        });

        return url.toString();
    }

    private load<T>(method: 'GET', endpoint: string, callback: ApiCallback<T>, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((response: Response) => this.errorHandler(response))
            .then((response: Response) => response.json() as Promise<unknown>)
            .then((data: unknown) => callback(data as T))
            .catch((error: unknown) => console.error(error));
    }
}

export default Loader;
