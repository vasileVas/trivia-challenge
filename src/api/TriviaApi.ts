import BaseApi from './BaseApi';

export interface IOptions {
    amount?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    type?: 'boolean' | 'multiple';
}

export default class TriviaApi extends BaseApi {
    private baseApi: BaseApi;

    constructor() {
        super();
        this.baseApi = new BaseApi();
    }

    public fetchQuestions({
        amount = 10,
        difficulty = 'easy',
        type = 'boolean'
    }: IOptions) {
        return this.baseApi.makeRequest({
            url: `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
        });
    }
}
