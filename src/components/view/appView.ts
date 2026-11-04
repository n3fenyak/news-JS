import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types/news';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        const articles = data.articles ?? [];
        this.news.draw(articles);
    }

    public drawSources(data: SourcesResponse): void {
        const sources = data.sources ?? [];
        this.sources.draw(sources);
    }
}

export default AppView;
