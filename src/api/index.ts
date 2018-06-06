import TriviaApi, { IOptions } from './TriviaApi';

export default class Api {
    private triviaApi: TriviaApi;

    constructor() {
        this.triviaApi = new TriviaApi();
    }

    public fetchQuestions(options: IOptions) {
        return this.triviaApi.fetchQuestions(options);
    }
}
