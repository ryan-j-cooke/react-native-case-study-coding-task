import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/store/reducers';
import App from './src/app';

const store = createStore(rootReducer);

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </Provider>
    );
}

AppRegistry.registerComponent('Case Study App', () => Main);