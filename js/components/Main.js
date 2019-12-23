import React, { Component } from 'react';
import LocationList from './LocationList';
import { StyleSheet, TextInput, View, Button, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { AsyncStorage } from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";

const defaultState = {
        data:[{
            id: '1',
            name: 'Home Noodles',
        },
        {
            id: '2',
            name: 'Porki Culture',
        },
        {
            id: '3',
            name: 'Servery',
        },
        {
            id: '4',
            name: 'Agrain',
		},
		{
            id: '5',
            name: 'Humble Nana',
		},
		{
            id: '6',
            name: 'Pie Kingdom',
		},
		{
            id: '7',
            name: 'Try something *New*',
        },
		],
		currentIdValue: 7
	}

export default class Main extends Component {

	constructor() {
		super()
		this.state = {
			alternateTheme: true
		}
		this._initializeState()
	}

	getStyle(styleName) {
        style = this.state.alternateTheme
                ? styles[styleName]
                : styles2[styleName]
        return style
	}
	
	toggleTheme = () => {
		this.setState({
			alternateTheme: !(this.state.alternateTheme)
		}, () => this._storeData())
	}

	_initializeState = async () => {
        try {
			const data = await AsyncStorage.getItem('data');
			const currentIdValue = await AsyncStorage.getItem('currentIdValue');
			const alternateTheme = await AsyncStorage.getItem('alternateTheme');
			this.setState({
				data: JSON.parse(data),
				currentIdValue: JSON.parse(currentIdValue),
				alternateTheme: JSON.parse(alternateTheme),
			})
        } catch (error) {
            console.log("Error initializing state: ", error)
		}
		
	}
	
	_storeData = async () => {
        try {
			//console.log("Current state: ", this.state)
			await AsyncStorage.setItem('data', JSON.stringify(this.state.data));
			await AsyncStorage.setItem('currentIdValue', JSON.stringify(this.state.currentIdValue));
			await AsyncStorage.setItem('alternateTheme', JSON.stringify(this.state.alternateTheme));
			console.log("Stored!")
        } catch (error) {
			console.log("Error storing data.", error)
        }
	}

    randomizeOrder(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
	
	randomizeLocation= () => {
		data = this.randomizeOrder(this.state.data)

		this.setState({
			data: data
		})
	}
	
	deleteLocation= (id) => {
        this.setState({
        	data: this.state.data.filter(item => item.id !== id)
		}, () => this._storeData())
	}
	
	addLocation= () => {
		if (this.state.text){
			id = this.state.currentIdValue + 1
			dataArray = {'id': id, 'name':this.state.text};
			try{
				this.setState({
					data: this.state.data.concat(dataArray),
					text: "",
					currentIdValue: id
				}, () => this._storeData())
			} catch (error) {
				console.log("Error adding location: ", error)
			}
			Keyboard.dismiss()
		} else {
			Alert.alert(
            '',
            'Please enter a valid location.'
        	);
		}

	}

	render() {
		return (
			<>
				<View style={ styles.container }>
					<View style = { styles.inputContainer }>
						<TextInput
						placeholder = "Insert new location..."
						style = { styles.placeInput }
						onChangeText={(text) => this.setState({text})}
        				value={this.state.text}
						></TextInput>
						<Icon.Button
							name="plus"
							borderRadius={ 30 }
							onPress={this.addLocation}
							style = { this.getStyle('placeButton') }
							iconStyle = { this.getStyle('placeButton') }
						>
							<Text style={ this.getStyle('addButtonText') }>Add</Text>
						</Icon.Button>
					</View>
				</View>

				<LocationList alternateTheme={this.state.alternateTheme} data={this.state.data} delete={this.deleteLocation.bind(this)} />
				<View style = { styles.buttonContainer }>
					<Icon.Button
						name="random"
						borderRadius={30}
						style={ this.getStyle('randomizeButton') }
						iconStyle={ this.getStyle('randomizeButton') }
						onPress={this.randomizeLocation}
					>
						<Text style={ this.getStyle('randomizeButtonText') }>Randomize</Text>
					</Icon.Button>
					<View style={ styles.themeButtonContainer }>
						<Icon.Button name="hamburger" size={20} 
							borderRadius={30}
							onPress={this.toggleTheme}
							style={ this.getStyle('toggleThemeButton') }
						iconStyle={ this.getStyle('toggleThemeButton') }
						/>
					</View>
					

				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '89%'
	},
	placeInput: {
		width: '80%',
		textAlign: 'center',
		alignItems: 'center',
		borderColor: '#3b5998',
		borderWidth: 0,
		borderRadius: 70,
		fontSize: 28,
	},
	placeButton: {
		alignItems: 'flex-end',
		backgroundColor: "#3b5998",
		color: 'white'
	},
	buttonContainer: { 
		flexDirection: 'column-reverse', 
		flex: 0.25, 
		justifyContent: 'flex-start', 
		alignItems: 'center', 
		marginBottom: 30
	},
	addButtonText: {
		color: 'white',
		fontFamily:'Arial', 
		fontWeight: '900', 
		alignSelf:'center', 
		marginLeft: -5, 
		marginRight: 5
	},
	randomizeButton: {
		backgroundColor: "#3b5998",
		color: 'white',
	},
	themeButtonContainer: {
		position: 'absolute',
		width: 50,
		height: 50,
		top: 10,
		right: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	toggleThemeButton: {
		backgroundColor: "#3b5998",
		color: 'white',
		marginRight: 0
	},
	randomizeButtonText: {
		color: 'white',
		fontFamily:'Arial', 
		fontWeight: '900', 
		alignSelf:'center', 
		marginLeft: -5, 
		marginRight: 5
	}
});

const styles2 = StyleSheet.create({
	container: {
		paddingTop: 30,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '89%'
	},
	placeInput: {
		width: '80%',
		textAlign: 'center',
		alignItems: 'center',
		borderColor: 'pink',
		borderWidth: 0,
		borderRadius: 70,
		fontSize: 28,
	},
	placeButton: {
		alignItems: 'flex-end',
		backgroundColor: "pink",
		color:'black'
	},
	buttonContainer: { 
		flexDirection: 'row-reverse', 
		flex: 0.25, 
		justifyContent: 'flex-start', 
		alignItems: 'center', 
		marginBottom: 30,
		backgroundColor: 'black'
	},
	addButtonText: {
		color: 'black',
		fontFamily:'Arial', 
		fontWeight: '900', 
		alignSelf:'center', 
		marginLeft: -5, 
		marginRight: 5
	},
	randomizeButton: {
		backgroundColor: "pink",
		color: 'black',
	},
	toggleThemeButton: {
		backgroundColor: "pink",
		color: 'black',
		marginRight: 0
	},
	randomizeButtonText: {
		color: 'black',
		fontFamily:'Arial', 
		fontWeight: '900', 
		alignSelf:'center', 
		marginLeft: -5, 
		marginRight: 5
	}
});