import * as React from 'react';
import HomeScreen from '../components/HomeScreen';

import { TriviaStore } from '../stores/TriviaStore';
import { observer } from 'mobx-react';

@observer
export default class HomeScreenContainer extends React.Component<{
    store: TriviaStore;
    history: any;
}> {
    private startTrivia = () => {
        this.props.store.startTrivia();
        this.props.history.push('/play');
    };
    private continueTrivia = () => {
        this.props.history.push('/play');
    };
    public render() {
        return (
            <HomeScreen
                onStart={this.startTrivia}
                challengeStarted={Boolean(this.props.store.currentQuestion)}
                numberOfQuestions={this.props.store.numberOfQuestions}
                onContinue={this.continueTrivia}
            />
        );
    }
}
