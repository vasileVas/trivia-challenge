import * as React from 'react';

export interface IProps {
    challengeStarted: boolean;
    numberOfQuestions: number;
    onStart(): void;
    onContinue(): void;
}

const HomeScreen: React.SFC<IProps> = ({
    challengeStarted,
    numberOfQuestions,
    onStart,
    onContinue
}) => (
    <>
        <h2>Welcome to the Trivia Challenge</h2>

        <h3>
            You will presented with {numberOfQuestions} True or False questions
        </h3>

        <h3>Can you score 100%</h3>

        <a className="waves-effect waves-light btn-large" onClick={onStart}>
            Begin
        </a>
        {challengeStarted && (
            <a
                className="waves-effect waves-light btn-large"
                onClick={onContinue}
            >
                Continue
            </a>
        )}
    </>
);

export default HomeScreen;
