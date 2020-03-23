/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import ReactNative from 'react-native';
import ATHMPayment from './athmovil/ATHMPayment';
import PayButton from './athmovil/PayButton';

import {
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});



export default class Home extends React.Component {

  render () {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Home</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                  Welcome home.
                </Text>
<Button
          title="Pay"
          onPress={() => this.props.navigation.navigate('PayScreen')}
        />

              <Button
          title="Checkout Result"
          onPress={() => this.props.navigation.navigate('CheckoutResult')}
        />
              <Button
          title="Help"
          onPress={() => this.props.navigation.navigate('Help')}
        />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
