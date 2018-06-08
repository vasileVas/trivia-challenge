import * as React from 'react';
import HomeScreen from '../components/HomeScreen';

import { TriviaStore, PLAY_ROUTE } from '../stores/TriviaStore';
import { observer } from 'mobx-react';

@observer
export default class HomeScreenContainer extends React.Component<{
    store: TriviaStore;
    history: any;
}> {
    private startTrivia = () => {
        this.props.store.startTrivia();
        this.props.history.push(PLAY_ROUTE);
    };
    private continueTrivia = () => {
        this.props.history.push(PLAY_ROUTE);
    };
    public render() {
        return (
            <HomeScreen
                onStart={this.startTrivia}
                challengeStarted={Boolean(this.props.store.currentQuestion)}
                numberOfQuestions={10}
                onContinue={this.continueTrivia}
            />
        );
    }
}
