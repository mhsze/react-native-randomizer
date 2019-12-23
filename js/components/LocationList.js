import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

class Item extends Component {

    handlePressDelete(id, name) {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete ' + name + '?',
            [
            {text: 'No', style: 'cancel'},
            {text: 'Yes', onPress: () => this.props.deleteLocation(id)},
            ]
        );
    }

    getStyle(styleName) {
        style = this.props.alternateTheme
                ? styles[styleName]
                : styles2[styleName]
        return style
    }

    render(){
    const { id, name } = this.props.item
        return(
            <View style={this.getStyle('itemContainer')}>
                <View style={styles.textContainer}>
                    <Text style={this.getStyle('nameText')}>{name}</Text>
                </View>
                <View style={styles.deleteButtonContainer}>
                    <Icon.Button
					name="remove"
                    style={this.getStyle('deleteButton')}
                    iconStyle={this.getStyle('deleteButton')}
					onPress={ () => this.handlePressDelete(id, name) }
                    ></Icon.Button>
                </View>
            </View>
        )
    }
}

export default class LocationList extends Component {

	render() {
        return (
            <SafeAreaView style={styles.container}>
                <View >
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => <Item item={item} deleteLocation={this.props.delete} alternateTheme={this.props.alternateTheme}/>}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </SafeAreaView>
            
        );
    }
    
    randomizeOrder(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 10,
  },
  textContainer:{
    maxWidth: '80%',
    justifyContent: 'center'
  },
  itemContainer: {
    backgroundColor: '#3b5998',
    borderRadius: 70,
    padding: 21,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  nameText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  deleteButtonContainer: {
    maxHeight: 45,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deleteButton: {
      marginRight: 0,
      backgroundColor: '#3b5998',
      color: 'white'
  }
});

const styles2 = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'pink',
    borderRadius: 70,
    padding: 21,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  nameText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  deleteButton: {
      marginRight: 0,
      backgroundColor: 'pink',
      color: 'black'
  }
});
