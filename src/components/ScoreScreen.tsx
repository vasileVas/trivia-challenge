import * as React from 'react';
import { IQuestion } from '../stores/TriviaStore';
import { QuestionEvaluation } from './QuestionEvaluation';

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
    <>
        <h1>
            You scored {correctAnswers}/{numberOfQuestions}
        </h1>
        {questions.map((question: IQuestion) => (
            <QuestionEvaluation
                key={question.id}
                question={question.question}
                respondedCorrectly={question.respondedCorrectly}
            />
        ))}

        <a className="waves-effect waves-light btn" onClick={playAgain}>
            Play again
        </a>
    </>
);

export default ScoreScreen;
