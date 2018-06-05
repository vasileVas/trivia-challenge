import { observable, action, computed } from 'mobx';
const uuidv1 = require('uuid/v1');

export interface IQuestion {
    id: string;
    category: string;
    question: string;
    correct_answer: string;
    respondedCorrectly: boolean;
}

const mockQuestions = [
    {
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        respondedCorrectly: false
    },
    {
        category: 'Science & Nature',
        type: 'boolean',
        difficulty: 'hard',
        question:
            'You can calculate Induced Voltage using: &epsilon; =-N * (d&Phi;B)/(d)',
        correct_answer: 'False',
        incorrect_answers: ['True'],
        respondedCorrectly: false
    }
];

export class TriviaStore {
    @observable public currentQuestion: number = 0;
    @observable public questions: IQuestion[];

    constructor() {
        const mockFetch = mockQuestions.map(rawQuestion => ({
            id: uuidv1(),
            ...rawQuestion,
            respondedCorrectly: false
        }));

        this.setQuestions(mockFetch);
    }

    @action
    public setQuestions = (questions: any) => {
        this.questions = questions;
    };

    @computed
    get triviaQuestions() {
        return this.questions.map(({ id, category, question }: IQuestion) => ({
            id,
            category,
            question
        }));
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

        // tslint:disable-next-line:no-console
        console.log('aaaa', this.currentQuestion);
    };
}
