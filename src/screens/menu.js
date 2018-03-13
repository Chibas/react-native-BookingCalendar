import React from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';

class LogoTitle extends React.Component {
    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{ width: 30, height: 30, marginLeft: 20 }}
                />
                <Text style={{marginLeft: 20, color: '#fff', fontWeight: 'bold', fontSize: 24}}>AIT Booking app</Text>
            </View>

        );
    }
}

export default class MenuScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };

        this.addItem = this.addItem.bind(this);
        this.moveToAdd = this.moveToAdd.bind(this);

    }

    static navigationOptions = {
        headerTitle: <LogoTitle />
    };

    static validate(item) {
        for (let key in item) {
            if (item[key] === null) {
                return false;
            }
        }
        return true;
    }

    addItem(item) {

        if (!MenuScreen.validate(item)) {
            Alert.alert('Validation error', 'Cannot add. Please fill all of the required fields');
            return false;
        }

        const time = item.date;
        const strTime = this.timeToString(time);

        let items = this.state.items;
        if (!this.state.items[strTime]) {
            items[strTime] = []; // WIX AGENDA TAKES DATE AS EMPTY ONLY IF IT HAS AN EMPTY ARRAY. ELSE - ENDLESS PRELOADER
        }

        items[strTime].push({
            title: item.title,
            service: item.service,
            height: 150,
            time: item.date.toLocaleTimeString('en-US')
        });

        this.setState({
            items: items
        });

        this.moveToCalendar();

    }

    moveToCalendar = () => {
        this.props.navigation.navigate('Calendar', {
            items: this.state.items
        });
    };

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }


    moveToAdd() {
        this.props.navigation.navigate('Add', {
            handleData: this.addItem
        })
    };

    render() {

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
                <Button style={{ width: 300 }}
                    title="Calendar"
                    onPress={() => this.props.navigation.navigate('Calendar', {
                        items: this.state.items,
                        moveToAdd: this.moveToAdd
                    })}
                />
                <Button style={{marginTop: 20,
                    backgroundColor: 'skyblue',
                    width: 200}}
                    title="Add item"
                    onPress={() => this.props.navigation.navigate('Add', {
                        handleData: this.addItem
                    })}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    menuItem: {
        marginTop: 20,
        backgroundColor: 'skyblue',
        width: 200
    }
});