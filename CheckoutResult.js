/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors
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

export default class PaymentResult extends React.Component {

  static navigationOptions = {
    header: { visible: false } // !!! Hide Header
  }

  render () {
    let paymentData
    let errorMessage
    let status

    if (this.props.route && this.props.route.params && this.props.route.params.athm_payment_data) {
      try {
        paymentData = JSON.parse(this.props.route.params.athm_payment_data)
        status = paymentData.completed
      } catch (err) {
        errorMessage = 'There was an error retrieving your payment data'
      }
    }

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Checkout Result</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                {(status === true) && (<Text style={styles.sectionDescription}>
                  Your payment was completed succsefully.
                </Text>)}
                {(status === false) && (<Text style={styles.sectionDescription}>
                  There was an error in your payment.
                </Text>)}
                  <Button
                    title="Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                  />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
