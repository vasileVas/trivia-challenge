import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import PlayScreenContainer from '../containers/PlayScreenContainer';
import ScoreScreen from './ScoreScreen';
import Header from './Header';
import { TriviaContext, TriviaConsumer } from './TriviaContext';

import { TriviaStore } from '../stores/TriviaStore';

class App extends React.Component {
    public render() {
        return (
            <TriviaContext.Provider value={new TriviaStore()}>
                <Router>
                    <div className="App">
                        <Header />
                        <Route exact path="/" component={HomeScreen} />
                        <Route
                            path="/play"
                            component={() => (
                                <TriviaConsumer>
                                    {(store: TriviaStore) => (
                                        <PlayScreenContainer store={store} />
                                    )}
                                </TriviaConsumer>
                            )}
                        />
                        <Route path="/score" component={ScoreScreen} />
                    </div>
                </Router>
            </TriviaContext.Provider>
        );
    }
}

export default App;
