import './sources.css';
import type { NewsSource } from '../../../types/news';

class Sources {
    public draw(data: NewsSource[]): void {
        const container = document.querySelector<HTMLElement>('.sources');
        const template = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!container || !template) {
            console.error('Sources container or template not found');
            return;
        }

        const fragment = document.createDocumentFragment();

        data.forEach((item) => {
            const clone = template.content.cloneNode(true) as DocumentFragment;

            const sourceItem = clone.querySelector<HTMLElement>('.source__item');
            const sourceName = clone.querySelector<HTMLElement>('.source__item-name');

            if (sourceName) {
                sourceName.textContent = item.name;
            }

            if (sourceItem && item.id !== null) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(clone);
        });

        container.replaceChildren(fragment);
    }
}

export default Sources;
