import { observable, action, computed, reaction } from 'mobx';
import Api from '../api';
const uuidv1 = require('uuid/v1');

export interface IRawQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string;
}

export interface IQuestion {
    id: string;
    category: string;
    question: string;
    correct_answer: string;
    respondedCorrectly: boolean;
}

export class TriviaStore {
    private api: Api;
    @observable public currentQuestion: number = 0;
    @observable public questions: IQuestion[] = [];

    constructor(api: Api) {
        this.api = api;

        reaction(
            () => this.stopGame,
            () => {
                window.location.hash = '/score';
            }
        );
    }

    public fetchQuestions = async () => {
        this.resetQuestions();

        const { response_code, results } = await this.api.fetchQuestions({
            amount: 3
        });

        if (response_code !== 0) {
            throw new Error('Fetch questions failed');
        }

        this.setQuestions(results);
    };

    @computed
    get triviaQuestions() {
        return this.questions.map(({ id, category, question }: IQuestion) => ({
            id,
            category,
            question
        }));
    }

    @computed
    get numberOfQuestions() {
        return this.questions.length;
    }

    @computed
    get stopGame() {
        const { numberOfQuestions, currentQuestion } = this;
        return (
            Boolean(numberOfQuestions) && numberOfQuestions === currentQuestion
        );
    }

    @computed
    get correctAnswer() {
        return this.questions.filter(q => q.respondedCorrectly).length;
    }

    @action
    public checkResponse = (id: string, response: string) => {
        const answeredQuestion = this.questions.find(
            (question: IQuestion) => question.id === id
        );

        if (!answeredQuestion) {
            throw new Error('Should match id when responding');
        }

        // tslint:disable-next-line:no-console
        console.log('answeredQuestion', answeredQuestion, response);

        if (answeredQuestion.correct_answer === response) {
            answeredQuestion.respondedCorrectly = true;
        }

        this.currentQuestion++;
    };

    @action
    private resetQuestions = () => {
        this.questions = [];
    };

    @action
    private setQuestions = (questions: IRawQuestion[]) => {
        this.questions = questions.map(rawQuestion => ({
            id: uuidv1(),
            ...rawQuestion,
            respondedCorrectly: false
        }));
        this.currentQuestion = 0;
    };
}
