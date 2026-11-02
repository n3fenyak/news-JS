import AppLoader from './appLoader';
import { NewsEndpoint } from '../../types/news';
import type { ApiCallback, NewsResponse, SourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: ApiCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: NewsEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: ApiCallback<NewsResponse>): void {
        const newsContainer = event.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target = event.target;

        while (target instanceof HTMLElement && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (!sourceId) {
                    return;
                }

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<NewsResponse>(
                        {
                            endpoint: NewsEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
