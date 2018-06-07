import * as React from 'react';
import { observer } from 'mobx-react';

export interface IQuestion {
    id: string;
    category: string;
    question: string;
    type: 'boolean' | 'multiple';
    availableAnswers: string[];
}

export interface IProps {
    questions: IQuestion[];
    currentQuestion: number;
    numberOfQuestions: number;
    checkResponse(id: string, response: string): void;
}

@observer
class PlayScreen extends React.Component<IProps> {
    public render() {
        const {
            questions,
            currentQuestion,
            numberOfQuestions,
            checkResponse
        } = this.props;

        if (questions.length === 0 || !questions[currentQuestion - 1]) {
            return null;
        }

        const { id, category, question, availableAnswers, type } = questions[
            currentQuestion - 1
        ];

        return (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{category}</span>
                        <p>{question}</p>
                    </div>
                    <div className="card-action">
                        {type === 'boolean' &&
                            availableAnswers.map(answer => (
                                <a onClick={() => checkResponse(id, answer)}>
                                    {answer}
                                </a>
                            ))}
                    </div>
                </div>
                <div>
                    Progress: {currentQuestion}/{numberOfQuestions}
                </div>
            </div>
        );
    }
}

export default PlayScreen;
