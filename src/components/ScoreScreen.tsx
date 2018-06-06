import * as React from 'react';

export interface IProps {
    correctAnswers: number;
    numberOfQuestions: number;
    questions: any;
}

const ScoreScreen: React.SFC<IProps> = ({
    correctAnswers,
    numberOfQuestions
}) => (
    <>
        <h1>
            You scored {correctAnswers}/{numberOfQuestions}
        </h1>
    </>
);

export default ScoreScreen;
