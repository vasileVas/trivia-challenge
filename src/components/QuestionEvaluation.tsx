import * as React from 'react';

export interface IProps {
    question: string;
    respondedCorrectly: boolean;
}

export const QuestionEvaluation: React.SFC<IProps> = ({
    question,
    respondedCorrectly
}) => (
    <div>
        {respondedCorrectly ? (
            <i className="material-icons">add</i>
        ) : (
            <i className="material-icons">remove</i>
        )}
        <h2>{question}</h2>
    </div>
);
