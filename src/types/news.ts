export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type ApiStatus = 'ok' | 'error';

export interface NewsSource {
    id: string | null;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsArticle {
    source: Pick<NewsSource, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: ApiStatus;
    totalResults: number;
    articles: NewsArticle[];
}

export interface SourcesResponse {
    status: ApiStatus;
    sources: NewsSource[];
}

export interface RequestOptions {
    apiKey?: string;
    sources?: string;
    [key: string]: string | undefined;
}

export interface RequestConfig {
    endpoint: NewsEndpoint;
    options?: Partial<RequestOptions>;
}

export type ApiCallback<T> = (data: T) => void;

export type ReadonlyArticle = Readonly<NewsArticle>;
