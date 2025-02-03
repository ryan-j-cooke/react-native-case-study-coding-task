import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Splash from './splash';
import Home from './home';

const App = () => {
	const [isAppReady, setIsAppReady] = useState(false);

	if (!isAppReady) {
		return <Splash onAnimationEnd={() => setIsAppReady(true)} />;
	}

	return <Home />;
};

export default App;
