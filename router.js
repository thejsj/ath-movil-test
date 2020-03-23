import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import Help from './help';
import Home from './Home';
import PayScreen from './Pay';
import PaymentResult from './CheckoutResult';
const r = require('react-native');


import { useLinking, NavigationContainer } from "@react-navigation/native";

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
        console.log('state')
        console.log(state)
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
const MyTabs = createBottomTabNavigator();

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <MyTabs.Navigator>
        <MyTabs.Screen name="Home" component={Home} />
        <MyTabs.Screen name="PayScreen" component={PayScreen} />
        <MyTabs.Screen name="PaymentResult" component={PaymentResult} />
        <MyTabs.Screen name="Help" component={Help} />
      </MyTabs.Navigator>
    </NavigationContainer>
  );
}
