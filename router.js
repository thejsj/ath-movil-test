import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Help from './help';
import Home from './help';
import CheckoutResult from './CheckoutResult';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Help: {
    screen: Help
  },
  CheckoutResult: {
    screen: CheckoutResult,
    path: 'paymentresult/:status/:referenceNumber/:total/:tax/:subtotal/:metadata1/:metadata2/:items'
  }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#410009"
    },
    headerTintColor: "#FFFFFF"
  }
});

export default createAppContainer(AppNavigator);
