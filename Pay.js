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
  Colors
} from 'react-native/Libraries/NewAppScreen';

const doit = function () {
  let total = 1.12;
  let metaData1 = "Milk";
  let metaData2 = "Shake 2";
  let items = [
        {
          name: "Cake",
          desc: "8oz",
          price: 0.25,
          quantity: 2,
          metadata: "employee discount"
        },
        {
          name: "Cola",
          desc: "68oz",
          price: 0.75,
          quantity: 1,
          metadata: "expiration 0820"
        }
      ];
  let subtotal = 1.0;
  let tax = 0.12;
  const publicToken = "425a7db8bf73d54cd151a5c99a123ab79e80000a"
  console.log('ATHMPayment.pay')
  ATHMPayment.pay("athmoviltest", publicToken, total, subtotal, tax, metaData1, metaData2, items, function (err) {
     console.log("error", err)
  });

}

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
    marginBottom: 10,
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

export default class PayScreen extends React.Component {

  render () {
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionDescription}>
                  You owe $1.12.
                </Text>
                <PayButton
                  language="es"
                  theme="dark"
                  onPress={() => doit()}
                  />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
