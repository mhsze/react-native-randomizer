import React, { Component } from 'react';
import Main from './js/components/Main';
import Header from './js/components/Header';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: AsyncStorage has been extracted from react-native core']);

export default class App extends Component {
	render() {
		return (
      <>
        <Header />
        <Main />
      </>
    );
	}
}
