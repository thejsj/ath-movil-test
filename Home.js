/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
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

const doit = function () {
  console.log('do it now')
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
  console.log(ATHMPayment)
  ATHMPayment.pay("athmoviltest", publicToken, total, subtotal, tax, metaData1, metaData2, items, function (err) {
     console.log("error", err)
  });

}

const Home: () => React$Node = ({ navigation }) => {
  console.log('ATHMPayment')
  console.log(ATHMPayment)
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

<PayButton
  language="es"
  theme="dark"
  onPress={
    () => doit()
  } />


            <Button
        title="Checkout Result"
        onPress={() => navigation.navigate('CheckoutResult')}
      />
            <Button
        title="Help"
        onPress={() => navigation.navigate('Help')}
      />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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

export default Home;
