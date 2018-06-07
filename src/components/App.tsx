import * as React from 'react';
import { observer } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Api from '../api';
import {
    TriviaStore,
    HOME_ROUTE,
    PLAY_ROUTE,
    SCORE_ROUTE
} from '../stores/TriviaStore';

import Header from './Header';
import HomeScreenContainer from '../containers/HomeScreenContainer';
import PlayScreen from './PlayScreen';
import ScoreScreen from './ScoreScreen';

const api = new Api();
const triviaStore = new TriviaStore(api);

class App extends React.Component {
    public render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Route
                        exact
                        path={HOME_ROUTE}
                        component={({ history }: any) => (
                            <HomeScreenContainer
                                store={triviaStore}
                                history={history}
                            />
                        )}
                    />
                    <Route
                        path={PLAY_ROUTE}
                        component={observer(() => (
                            <PlayScreen
                                questions={triviaStore.triviaQuestions}
                                currentQuestion={triviaStore.currentQuestion}
                                numberOfQuestions={
                                    triviaStore.numberOfQuestions
                                }
                                checkResponse={triviaStore.checkResponse}
                            />
                        ))}
                    />
                    <Route
                        path={SCORE_ROUTE}
                        component={observer(() => (
                            <ScoreScreen
                                correctAnswers={triviaStore.correctAnswer}
                                numberOfQuestions={
                                    triviaStore.numberOfQuestions
                                }
                                questions={triviaStore.questions}
                                playAgain={triviaStore.playAgain}
                            />
                        ))}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
