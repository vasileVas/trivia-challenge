import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-testing-library';
import { QuestionEvaluation } from './QuestionEvaluation';

const getQuestionEvaluationComponent = (props: any = {}) => (
    <QuestionEvaluation
        question={'question text'}
        respondedCorrectly
        {...props}
    />
);

describe('[QuestionEvaluation component]', () => {
    it('should render component', () => {
        const { getByTestId, unmount } = render(
            getQuestionEvaluationComponent()
        );
        expect(getByTestId('score-question')).toBeTruthy();
        expect(getByTestId('score-question-text').textContent).toBe(
            'question text'
        );
        unmount();
    });
    it('should render question as correct one', () => {
        const { getByTestId, unmount } = render(
            getQuestionEvaluationComponent({
                respondedCorrectly: true
            })
        );
        expect(getByTestId('score-success')).toBeTruthy();
        unmount();
    });
    it('should render question as wrong one', () => {
        const { getByTestId, unmount } = render(
            getQuestionEvaluationComponent({
                respondedCorrectly: false
            })
        );
        expect(getByTestId('score-fail')).toBeTruthy();
        unmount();
    });
});
