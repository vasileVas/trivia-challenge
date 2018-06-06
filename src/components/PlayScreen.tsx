import * as React from 'react';
import { observer } from 'mobx-react';

export interface IQuestion {
    id: string;
    category: string;
    question: string;
}

export interface IProps {
    questions: IQuestion[];
    currentQuestion: number;
    checkResponse(id: string, response: string): void;
}

@observer
class PlayScreen extends React.Component<IProps> {
    public render() {
        const { questions, currentQuestion, checkResponse } = this.props;

        if (questions.length === 0 || !questions[currentQuestion]) {
            return null;
        }

        const { id, category, question } = questions[currentQuestion];

        return (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{category}</span>
                        <p>{question}</p>
                    </div>
                    <div className="card-action">
                        <a onClick={() => checkResponse(id, 'True')}>True</a>
                        <a onClick={() => checkResponse(id, 'False')}>False</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayScreen;
