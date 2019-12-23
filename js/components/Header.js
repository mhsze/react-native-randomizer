import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends Component {
	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}> Randomizer </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 33,
        height: 50
	},
	headerText: {
		textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
		marginBottom: 5
	}
});