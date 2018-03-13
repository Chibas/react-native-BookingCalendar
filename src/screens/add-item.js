import React from 'react';
import { View, Text, Picker, TextInput, Button, DatePickerAndroid, TouchableWithoutFeedback, TimePickerAndroid, StyleSheet } from 'react-native';


export default class AddItemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            service: '',
            title: null,
            date: null,
            time: null
        };
        const { params } = this.props.navigation.state;
        this.handleData = params ? params.handleData: null;
        // this.onSubmit = this.onSubmit.bind(this);

    }

    static navigationOptions = {
        title: 'Add booking'
    };

    onSubmit = (item) => {
        console.log('HANDLING DATA');
        this.handleData(item);
    };

    logMe() {
        console.log('LOG GLOG');
    }

    showDatePicker = async (stateKey, options) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                console.log(year, month, day);
                this.setState({
                    date: new Date(year, month, day)
                });
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    showTimePicker = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: 12,
                minute: 0,
                is24Hour: false, // Will display '2 PM'
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                console.log(hour, minute);
                let prevDate = this.state.date;
                let date = prevDate.setHours(hour, minute);
                this.setState((prevState, props) => ({
                        time: `${hour}:${minute}`,
                        date: new Date(date)
                }));
                console.log(this.state.date)

            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    };


    render() {
        let datePickerButton = null;
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true }; //Date formatting options

        // DATE BUTTON
        if (this.state.date === null) {
            datePickerButton = <View style={styles.pickerBtn}><Text style={styles.pickerText}>PICK A DATE</Text></View>
        } else {
            datePickerButton = <View style={styles.pickerBtn}><Text style={styles.pickerText}>{this.state.date.toLocaleDateString('en-US', options)}</Text></View>
        }

        // TIME BUTTON
        if (this.state.time === null) {
            timePickerButton = <View style={styles.pickerBtn}><Text style={styles.pickerText}>PICK A TIME</Text></View>
        } else {
            timePickerButton = <View style={styles.pickerBtn}><Text style={styles.pickerText}>{this.state.date.toLocaleTimeString('en-US')}</Text></View>
        }

        return(
            <View style={{padding: 10, justifyContent: 'space-between'}}>
                <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                    Please, enter your booking details
                </Text>
                <Picker style={{marginTop: 40}}
                    selectedValue={this.state.service}
                    onValueChange={(itemValue, itemIndex) => this.setState({service: itemValue})}>
                    <Picker.Item label="Dentist" value="dentist" />
                    <Picker.Item label="Barber" value="barber" />
                    <Picker.Item label="Babysitter" value="babysitter" />
                    <Picker.Item label="Cab" value="cab" />
                    <Picker.Item label="Plumber" value="Plumber" />
                </Picker>
                <TextInput style={{ height: 40}}
                           placeholder="Enter your name"
                           onChangeText={(titleValue) => this.setState({title: titleValue})}
                />

                <TouchableWithoutFeedback
                    onPress={this.showDatePicker.bind(this, 'min', { minDate: new Date() } )}>
                    {datePickerButton}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={this.showTimePicker.bind(this)}>
                    {timePickerButton}
                </TouchableWithoutFeedback>
                <View style={{marginTop: 50, fontSize: 24}} >
                    <Button style={{fontSize: 30}} title="Submit" onPress={ () => { this.onSubmit(this.state)}} />
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    pickerBtn: {
        height: 30,
        borderColor: 'rgb(89, 150, 205)',
        backgroundColor: 'rgb(89, 150, 205)',
        borderRadius: 5,
        color: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    pickerText: {
        color: 'white',
        fontWeight: 'bold'
    },
    submitBtn: {
        marginTop: 50
    }
});