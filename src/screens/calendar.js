import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class CalendarScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };

        const { params } = this.props.navigation.state;
        this.items = params ? params.items : {};
        this.moveToAdd = params ? params.moveToAdd: null;

    }

    static navigationOptions = {
        title: 'Calendar'
    };

    addItem() {
        console.log('pressed!');
        this.moveToAdd()
    }


    render() {

        return (
            <Agenda
                items={this.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        console.log('LOADING ITEMS ', day);
        console.log(this.items);
        const time = day.timestamp;
        const strTime = this.timeToString(time);
        if (!this.items[strTime]) {
            console.log('Added empty date for ', strTime);
            this.items[strTime] = [];
        }
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.items[strTime]) {
                this.items[strTime] = [];
                // const numItems = Math.floor(Math.random() * 5);
                // for (let j = 0; j < numItems; j++) {
                //     this.items[strTime].push({
                //         name: 'Item for ' + strTime,
                //         height: Math.max(50, Math.floor(Math.random() * 150))
                //     });
                // }
            }
        };


        const newItems = {};
        Object.keys(this.items).forEach(key => {newItems[key] = this.items[key];});
        this.items = newItems;
        //console.log(`Load Items for ${day.year}-${day.month}`);

        // const time = new Date();
        // const strTime = this.timeToString(time);
        // if (!this.state.items[strTime]) {
        //     let items = this.state.items;
        //     items[strTime] = [];
        //     items[strTime].push({
        //         name: 'Item for ' + strTime,
        //         height: Math.max(50, Math.floor(Math.random() * 150))
        //     });
        //     this.setState({
        //         items: items
        //     })
        //
        //     this.state.items[strTime].push({
        //         name: 'Item for ' + strTime,
        //         height: Math.max(50, Math.floor(Math.random() * 150))
        //     });
        // }
    }

    // addItem(item) {
    //     const time = new Date();
    //     const strTime = this.timeToString(time);
    //     if (!this.state.items[strTime]) {
    //         let items = this.state.items;
    //         items[strTime] = [];
    //         items[strTime].push({
    //             name: 'Item for ' + strTime,
    //             height: Math.max(50, Math.floor(Math.random() * 150))
    //         });
    //         this.setState({
    //             items: items
    //         })
    //
    //         // this.state.items[strTime].push({
    //         //     name: 'Item for ' + strTime,
    //         //     height: Math.max(50, Math.floor(Math.random() * 150))
    //         // });
    //     }
    // }

    renderItem(item) {
        return (
            <View style={[styles.item, {maxHeight: item.height}]}>
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.time}</Text>
                    <Text style={{fontWeight: 'bold'}}>{item.service}</Text>
                    <Text>{item.title}</Text>
                </View>
                <View>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.image}>
                    </Image>
                </View>
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate} >
                <TouchableNativeFeedback style={styles.emptyDate} onPress={() => this.addItem()}>
                  <Text>This is an empty date!</Text>
                </TouchableNativeFeedback>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#dedede',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: 'skyblue',
        borderRadius: 100,
        backgroundColor: '#eeeeee'
    }
});