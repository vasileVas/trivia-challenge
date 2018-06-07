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

        reaction(() => this.triviaEnded, () => this.changeHash('/score'));
    }

    public changeHash = (hash: string) => (window.location.hash = hash);

    @action
    public startTrivia = async () => {
        this.resetTrivia();
        await this.fetchQuestions();
        this.currentQuestion++;
    };

    public playAgain = () => {
        this.resetTrivia();
        this.changeHash('/');
    };

    private fetchQuestions = async () => {
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
    get triviaEnded() {
        const { numberOfQuestions, currentQuestion } = this;
        return (
            Boolean(numberOfQuestions) &&
            numberOfQuestions === currentQuestion - 1
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

        if (answeredQuestion.correct_answer === response) {
            answeredQuestion.respondedCorrectly = true;
        }

        this.currentQuestion++;
    };

    @action
    private resetTrivia = () => {
        this.questions = [];
        this.currentQuestion = 0;
    };

    @action
    private setQuestions = (questions: IRawQuestion[]) => {
        this.questions = questions.map(({ question, ...rawQuestion }) => ({
            id: uuidv1(),
            question: this.sanitizeText(question),
            ...rawQuestion,
            respondedCorrectly: false
        }));
        this.currentQuestion = 0;
    };

    private sanitizeText(text: string) {
        return text.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
    }
}
