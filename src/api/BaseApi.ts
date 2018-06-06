export interface IRequest {
    url: string;
    body?: object;
    method?: 'get' | 'post' | 'put' | 'delete';
}

export default class BaseApi {
    public makeRequest({ url, method = 'get' }: IRequest) {
        return fetch(url)
            .then(res => res.json())
            .catch(this.handleRequestError);
    }
    private handleRequestError() {
        throw new Error('There was an error while fetching data');
    }
}
