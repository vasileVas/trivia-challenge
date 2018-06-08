import 'babel-polyfill';
import * as React from 'react';
import { render, Simulate } from 'react-testing-library';
import ScoreScreen from './ScoreScreen';

const mockQuestions = [
    {
        id: 'id1',
        question: 'question1',
        respondedCorrectly: true
    },
    {
        id: 'id2',
        question: 'question2',
        respondedCorrectly: true
    }
];

const getScoreScreenComponent = (props: any = {}) => (
    <ScoreScreen
        correctAnswers={3}
        numberOfQuestions={10}
        questions={mockQuestions}
        playAgain={jest.fn()}
        {...props}
    />
);

describe('[ScoreScreen component]', () => {
    it('should render component', () => {
        const { unmount, container } = render(getScoreScreenComponent());
        expect(container).toBeTruthy();
        unmount();
    });
    it('should render score', () => {
        const { getByTestId, unmount } = render(getScoreScreenComponent());
        expect(getByTestId('final-score').textContent).toBe('You scored 3/10');
        unmount();
    });
    it('should call playAgain', () => {
        const playAgainMock = jest.fn();
        const { getByTestId, unmount } = render(
            getScoreScreenComponent({
                playAgain: playAgainMock
            })
        );
        Simulate.click(getByTestId('play-again'));
        expect(playAgainMock).toHaveBeenCalled();
        unmount();
    });
});
