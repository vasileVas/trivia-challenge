import * as React from 'react';
import styled from 'styled-components';

const Home = styled.div`
    h2,
    h3 {
        margin-bottom: 40px;
    }
    h2 {
        margin-top: 40px;
        font-size: 25px;
    }
    h3 {
        font-size: 20px;
    }
    a {
        margin-right: 10px;
    }
`;

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
    <Home data-testid="home-screen">
        <h2>Welcome to the Trivia Challenge</h2>

        <h3>
            You will presented with {numberOfQuestions} True or False questions
        </h3>

        <h3>Can you score 100% ?</h3>

        <a
            className="waves-effect waves-light btn-large"
            onClick={onStart}
            data-testid="start-button"
        >
            Begin
        </a>
        {challengeStarted && (
            <a
                className="waves-effect waves-light btn-large"
                onClick={onContinue}
                data-testid="continue-button"
            >
                Continue
            </a>
        )}
    </Home>
);

export default HomeScreen;
