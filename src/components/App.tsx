import * as React from 'react';
import './App.css';

import { HashRouter as Router, Route } from 'react-router-dom';
import HomeScreenContainer from '../containers/HomeScreenContainer';
import Header from './Header';

import { TriviaStore } from '../stores/TriviaStore';
import Api from '../api';
import PlayScreen from './PlayScreen';
import { observer } from 'mobx-react';
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
                        path="/"
                        component={({ history }: any) => (
                            <HomeScreenContainer
                                store={triviaStore}
                                history={history}
                            />
                        )}
                    />
                    <Route
                        path="/play"
                        component={observer(() => (
                            <PlayScreen
                                questions={triviaStore.triviaQuestions}
                                currentQuestion={triviaStore.currentQuestion}
                                checkResponse={triviaStore.checkResponse}
                            />
                        ))}
                    />
                    <Route
                        path="/score"
                        component={observer(() => (
                            <ScoreScreen
                                correctAnswers={triviaStore.correctAnswer}
                                numberOfQuestions={
                                    triviaStore.numberOfQuestions
                                }
                                questions={triviaStore.questions}
                            />
                        ))}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
