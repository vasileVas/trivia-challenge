import * as React from 'react';

export interface IProps {
    onStart(): void;
}

const HomeScreen: React.SFC<IProps> = ({ onStart }) => (
    <>
        <h1>Home Screen</h1>

        <a className="waves-effect waves-light btn-large" onClick={onStart}>
            Start Trivia
        </a>
    </>
);

export default HomeScreen;
