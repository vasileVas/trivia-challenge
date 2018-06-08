import 'babel-polyfill';
import * as React from 'react';
import { render, Simulate } from 'react-testing-library';
import HomeScreen from './HomeScreen';

const getHomeScreenComponent = (props: any = {}) => (
    <HomeScreen
        challengeStarted
        numberOfQuestions={10}
        onStart={jest.fn()}
        onContinue={jest.fn()}
        {...props}
    />
);

describe('[HomeScreen component]', () => {
    it('should render component', () => {
        const { unmount, container } = render(getHomeScreenComponent());
        expect(container).toBeTruthy();
        unmount();
    });
    it('should call onStart', () => {
        const onStartMock = jest.fn();
        const { getByTestId, unmount } = render(
            getHomeScreenComponent({
                onStart: onStartMock
            })
        );
        Simulate.click(getByTestId('start-button'));
        expect(onStartMock).toHaveBeenCalled();
        unmount();
    });
    it('should call onContinue', () => {
        const onContinueMock = jest.fn();
        const { getByTestId, unmount } = render(
            getHomeScreenComponent({
                onContinue: onContinueMock
            })
        );
        Simulate.click(getByTestId('continue-button'));
        expect(onContinueMock).toHaveBeenCalled();
        unmount();
    });
});
