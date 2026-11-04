import './sources.css';
import type { NewsSource } from '../../../types/news';

class Sources {
    private readonly pageSize = 16;
    private visibleCount = this.pageSize;
    private sources: NewsSource[] = [];

    public draw(data: NewsSource[]): void {
        this.sources = data;
        this.visibleCount = this.pageSize;
        this.render();
    }

    private render(): void {
        const container = document.querySelector<HTMLElement>('.sources');
        const template = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!container || !template) {
            console.error('Sources container or template not found');
            return;
        }

        const fragment = document.createDocumentFragment();
        const visibleSources = this.sources.slice(0, this.visibleCount);

        visibleSources.forEach((item) => {
            const clone = template.content.cloneNode(true) as DocumentFragment;
            const sourceItem = clone.querySelector<HTMLElement>('.source__item');
            const sourceName = clone.querySelector<HTMLElement>('.source__item-name');

            if (sourceName) sourceName.textContent = item.name;

            if (sourceItem && item.id !== null) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(clone);
        });

        container.replaceChildren(fragment);

        if (this.visibleCount < this.sources.length) {
            const showMore = document.createElement('button');
            showMore.type = 'button';
            showMore.className = 'sources__more';
            showMore.textContent = `Показать ещё (${this.sources.length - this.visibleCount})`;

            showMore.addEventListener('click', () => {
                this.visibleCount += this.pageSize;
                this.render();
            });

            container.append(showMore);
        }
    }
}

export default Sources;
