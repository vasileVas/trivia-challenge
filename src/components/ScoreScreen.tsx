import * as React from 'react';
import { IQuestion } from '../stores/TriviaStore';
import { QuestionEvaluation } from './QuestionEvaluation';
import styled from 'styled-components';

const Score = styled.div`
    h2 {
        font-size: 25px;
    }
    a {
        margin-top: 20px;
    }
`;

export interface IProps {
    correctAnswers: number;
    numberOfQuestions: number;
    questions: IQuestion[];
    playAgain(): void;
}

const ScoreScreen: React.SFC<IProps> = ({
    correctAnswers,
    numberOfQuestions,
    questions,
    playAgain
}) => (
    <Score>
        <h2 data-testid={'final-score'}>
            You scored {correctAnswers}/{numberOfQuestions}
        </h2>
        {questions.map((question: IQuestion) => (
            <QuestionEvaluation
                key={question.id}
                question={question.question}
                respondedCorrectly={question.respondedCorrectly}
            />
        ))}

        <a
            className="waves-effect waves-light btn"
            onClick={playAgain}
            data-testid={'play-again'}
        >
            Play again
        </a>
    </Score>
);

export default ScoreScreen;
