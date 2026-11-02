import Loader from './loader';

class AppLoader extends Loader {
    public constructor() {
        super(process.env.API_URL ?? 'https://rss-news-api.onrender.com/mocks/', {});
    }
}

export default AppLoader;
