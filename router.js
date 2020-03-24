import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { useLinking, NavigationContainer } from "@react-navigation/native";

import Help from './help';
import Home from './Home';
import PayScreen from './Pay';
import PaymentResult from './CheckoutResult';

const config = {
  Home: {
    screen: Home
  },
  PayScreen: {
    screen: PayScreen,
    path: '/payscreen'
  },
  Help: {
    screen: Help,
    path: '/help'
  },
  PaymentResult: {
    screen: PaymentResult,
    path: 'paymentresult'
  }
};

export default function App() {
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: ["athmoviltest://"],
    config
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }
        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PaymentResult" component={PaymentResult} />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
