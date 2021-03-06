import * as React from 'react';
import styled from 'styled-components';

const Question = styled.div`
    display: flex;
    margin-bottom: 10px;
    i {
        padding: 20px 10px 0 0;
    }
    h3 {
        font-size: 20px;
        text-align: left;
    }
`;

export interface IProps {
    question: string;
    respondedCorrectly: boolean;
}

export const QuestionEvaluation: React.SFC<IProps> = ({
    question,
    respondedCorrectly
}) => (
    <Question data-testid="score-question">
        {respondedCorrectly ? (
            <i className="material-icons" data-testid="score-success">
                add
            </i>
        ) : (
            <i className="material-icons" data-testid="score-fail">
                remove
            </i>
        )}
        <h3 data-testid="score-question-text">{question}</h3>
    </Question>
);
