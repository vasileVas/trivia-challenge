import { TriviaStore, HOME_ROUTE, SCORE_ROUTE } from './TriviaStore';
import Api from '../api';

const fetchQuestionsMock = jest
    .fn()
    .mockImplementation(() =>
        Promise.resolve({ response_code: 0, results: [] })
    );
const api = new Api();
api.fetchQuestions = fetchQuestionsMock;

describe('[TriviaStore]', () => {
    let triviaStore: any;
    beforeEach(() => {
        triviaStore = new TriviaStore(api);
    });
    describe('[startTrivia]', () => {
        it('should call fetchQuestion api on startTrivia', () => {
            triviaStore.startTrivia();
            expect(fetchQuestionsMock).toHaveBeenCalledWith({ amount: 10 });
        });
        it('should resetTrivia', () => {
            triviaStore.questions = ['q1', 'q2'];
            triviaStore.startTrivia();
            expect(triviaStore.questions.length).toBe(0);
        });
        it('should set currentQuestion to 1', async () => {
            await triviaStore.startTrivia();
            expect(triviaStore.currentQuestion).toBe(1);
        });
        test('fetchQuestion should setQuestion', async () => {
            triviaStore.setQuestions = jest.fn();
            await triviaStore.startTrivia();
            expect(triviaStore.setQuestions).toHaveBeenCalledWith([]);
        });
    });
    it('should resolve playAgain', () => {
        triviaStore.changeHash = jest.fn();
        triviaStore.resetTrivia = jest.fn();
        triviaStore.playAgain();
        expect(triviaStore.resetTrivia).toHaveBeenCalled();
        expect(triviaStore.changeHash).toHaveBeenCalledWith(HOME_ROUTE);
    });
    test('computed triviaQuestions should filter props for end user', () => {
        const question = {
            id: 'id',
            category: 'category',
            question: 'question',
            availableAnswers: 'availableAnswers',
            type: 'type'
        };
        triviaStore.questions = [
            {
                ...question,
                extraProps: 'extra prop'
            }
        ];
        expect(triviaStore.triviaQuestions).toEqual([question]);
    });
    describe('[triviaEnded]', () => {
        it('should return true', () => {
            triviaStore.questions = ['q1', 'q1', 'q1'];
            triviaStore.currentQuestion = 4;
            expect(triviaStore.triviaEnded).toBe(true);
        });
        it('should return false', () => {
            triviaStore.questions = ['q1', 'q1', 'q1'];
            triviaStore.currentQuestion = 2;
            expect(triviaStore.triviaEnded).toBe(false);
        });
    });
    it('should redirect to SCORE_ROUTE when trivia ended', () => {
        const changeHashMock = jest.fn();
        triviaStore.changeHash = changeHashMock;

        triviaStore.questions = ['q1', 'q1', 'q1'];
        triviaStore.currentQuestion = 3;
        expect(triviaStore.triviaEnded).toBe(false);
        triviaStore.currentQuestion = 4;
        expect(triviaStore.triviaEnded).toBe(true);

        expect(changeHashMock).toBeCalledWith(SCORE_ROUTE);
    });
});
