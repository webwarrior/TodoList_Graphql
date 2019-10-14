/**
 * @flow
 * @format
 */

'use strict';
import Colors from './Colors';
import type {Node} from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';


const Header = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('../../assets/toilets.jpeg')}
    style={styles.background}
    imageStyle={styles.logo}>
    <Text style={styles.text}>Dump you tasks here</Text>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: 0,
    marginBottom: 0,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
});


export default Header;
