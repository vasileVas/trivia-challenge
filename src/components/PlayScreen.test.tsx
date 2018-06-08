import 'babel-polyfill';
import * as React from 'react';
import { render, Simulate } from 'react-testing-library';
import PlayScreen from './PlayScreen';

const mockQuestions = [
    {
        id: 'id1',
        category: 'category1',
        question: 'question1',
        type: 'boolean',
        availableAnswers: ['False', 'True']
    },
    {
        id: 'id2',
        category: 'category2',
        question: 'question2',
        type: 'boolean',
        availableAnswers: ['False', 'True']
    }
];

const getPlayScreenComponent = (props: any = {}) => (
    <PlayScreen
        questions={mockQuestions}
        currentQuestion={1}
        numberOfQuestions={10}
        checkResponse={jest.fn()}
        {...props}
    />
);

describe('[PlayScreen component]', () => {
    it('should render first question', () => {
        const { getByTestId, unmount } = render(getPlayScreenComponent());
        expect(getByTestId('category').textContent).toBe('category1');
        expect(getByTestId('question').textContent).toBe('question1');
        expect(getByTestId('answer-False').textContent).toBe('False');
        expect(getByTestId('answer-True').textContent).toBe('True');
        expect(getByTestId('progress').textContent).toBe('Progress: 1/10');
        unmount();
    });
    it('should render second question', () => {
        const { getByTestId, unmount } = render(
            getPlayScreenComponent({
                currentQuestion: 2
            })
        );
        expect(getByTestId('category').textContent).toBe('category2');
        expect(getByTestId('question').textContent).toBe('question2');
        unmount();
    });
    it('should call checkResponse', () => {
        const checkResponseMock = jest.fn();
        const { getByTestId, unmount } = render(
            getPlayScreenComponent({
                checkResponse: checkResponseMock
            })
        );
        Simulate.click(getByTestId('answer-True'));
        expect(checkResponseMock).toHaveBeenCalledWith('id1', 'True');
        unmount();
    });
});
