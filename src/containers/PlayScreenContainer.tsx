import * as React from 'react';
import PlayScreen from '../components/PlayScreen';

import { TriviaStore } from '../stores/TriviaStore';
import { observer } from 'mobx-react';

@observer
export default class PlayScreenContainer extends React.Component<{
    store: TriviaStore;
}> {
    public render() {
        const store = this.props.store;
        return (
            <PlayScreen
                questions={store.triviaQuestions}
                currentQuestion={store.currentQuestion}
                checkResponse={store.checkResponse}
            />
        );
    }
}
