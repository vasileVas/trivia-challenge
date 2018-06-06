import * as React from 'react';

export const TriviaContext = React.createContext({});

export interface IProps {
    children(context: any): any;
    history?: any;
}

export const TriviaConsumer: React.SFC<IProps> = props => (
    <TriviaContext.Consumer {...props}>
        {context => {
            if (!context) {
                throw new Error('Should pass the store');
            }
            return props.children(context);
        }}
    </TriviaContext.Consumer>
);
