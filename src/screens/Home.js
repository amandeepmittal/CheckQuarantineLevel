import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default function Home() {
  const [pickedDate, setPickedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [days, setDays] = useState('');

  function showDatePicker() {
    setDatePickerVisibility(true);
  }

  function hideDatePicker() {
    setDatePickerVisibility(false);
  }

  function handleConfirm(date) {
    console.log('A date has been picked: ', date);
    setPickedDate(date);
    hideDatePicker();
  }

  function daysRemaining() {
    console.log({ pickedDate });
    let eventdate = moment(pickedDate);
    let todaysdate = moment();
    let remainingDays = todaysdate.diff(eventdate, 'days');
    setDays(remainingDays);
    return remainingDays;
  }

  function renderAchievements() {
    if (days => 1 && days < 5) {
      return <Text>Quarantine Noob</Text>;
    } else if (days >= 5 && days <= 7) {
      return <Text>Quarantine Connoisseur</Text>;
    } else if (days >= 8 && days <= 15) {
      return <Text>What is pants</Text>;
    } else if (days >= 16 && days <= 22) {
      return <Text>Quarantine Veteran</Text>;
    } else if (days >= 23) {
      return <Text>The Da Vinci of Staying Inside</Text>;
    } else return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerGroupContainer}>
        <Text style={styles.headerTitleText}>Gamify Quarantine</Text>
        <View style={styles.headerContentContainer}>
          <Text style={styles.headerSubtitleText}>
            To start, please pick a date
          </Text>
          <TouchableOpacity style={styles.button} onPress={showDatePicker}>
            <Fontisto name="date" size={22} color="red" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            headerTextIOS="When did you started isolating?"
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.pickedDataContainer}>
          <Text style={styles.pickedDateText}>You started isolating on </Text>
          {pickedDate && (
            <Text style={styles.pickedDateText}>
              {moment(pickedDate).format('YYYY-MM-DD')}
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.evaluateButton} onPress={daysRemaining}>
          <Text style={styles.evaluateButtonText}>Evaluate remaining days</Text>
        </TouchableOpacity>
        <View style={styles.rowContainer}>
          {days === '' ? (
            <Text style={styles.resultText}>0 days</Text>
          ) : (
            <Text style={styles.resultText}>{days} days</Text>
          )}
          {renderAchievements()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerGroupContainer: {
    marginTop: 60,
    alignItems: 'center'
  },
  headerTitleText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  headerContentContainer: {
    flexDirection: 'row',
    padding: 20
  },
  headerSubtitleText: {
    fontSize: 18
  },
  button: {
    paddingHorizontal: 10
  },
  body: {
    alignItems: 'center'
  },
  pickedDataContainer: {
    flexDirection: 'row',
    padding: 20
  },
  pickedDateText: {
    fontSize: 16
  },
  evaluateButton: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  evaluateButtonText: {
    padding: 5,
    fontSize: 22,
    color: 'green'
  },
  rowContainer: {
    marginTop: 20,
    flexDirection: 'row'
  },
  resultText: {
    fontSize: 22,
    paddingHorizontal: 10
  }
});
