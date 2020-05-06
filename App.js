import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const customFont = {
  'Press-Start2p': require('./assets/fonts/PressStart2P-Regular.ttf')
};

const W = Dimensions.get('window').width;

export default function App() {
  const [isLoaded] = useFonts(customFont);
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
    // console.log('A date has been picked: ', date);
    setPickedDate(date);
    hideDatePicker();
  }

  function daysRemaining() {
    let eventdate = moment(pickedDate);
    let todaysdate = moment();
    let remainingDays = todaysdate.diff(eventdate, 'days');
    setDays(remainingDays);
    return remainingDays;
  }

  function renderAchievements() {
    if (days > 1 && days < 5) {
      return (
        <>
          <MaterialCommunityIcons
            name="guy-fawkes-mask"
            color="#000"
            size={54}
          />
          <Text style={styles.resultText}>
            You are Quarantine Noob. Don't forget to wear a mask. Keep
            self-isolating.
          </Text>
        </>
      );
    } else if (days >= 5 && days <= 7) {
      return (
        <>
          <MaterialCommunityIcons name="glass-wine" color="#000" size={54} />
          <Text style={styles.resultText}>Quarantine Connoisseur</Text>
        </>
      );
    } else if (days >= 8 && days <= 15) {
      return (
        <>
          <MaterialCommunityIcons
            name="seat-legroom-reduced"
            color="#000"
            size={54}
          />
          <Text style={styles.resultText}>What is pants</Text>
        </>
      );
    } else if (days >= 16 && days <= 22) {
      return (
        <>
          <MaterialCommunityIcons
            name="star-circle-outline"
            color="#000"
            size={54}
          />
          <Text style={styles.resultText}>Quarantine Veteran</Text>
        </>
      );
    } else if (days >= 23) {
      return (
        <>
          <FontAwesome name="paint-brush" color="#000" size={54} />
          <Text style={styles.resultText}>The Da Vinci of Staying Inside</Text>
        </>
      );
    } else
      return (
        <Text style={styles.resultText}>Your level will be shown here.</Text>
      );
  }

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={styles.title}>{`Are you DaVinci of Isolation?`}</Text>
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View style={styles.pickerContainer}>
            <Fontisto style={styles.icon} name="calendar" size={48} />
            <Text
              style={styles.pickerText}
            >{`Tap here to\nselect a date`}</Text>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          headerTextIOS="When did you start isolating?"
        />
        <View style={styles.showDateContainer}>
          <Text style={styles.showDateText}>
            You started isolating on{' '}
            {pickedDate && (
              <Text style={styles.showDateText}>
                {moment(pickedDate).format('YYYY-MM-DD')}.
              </Text>
            )}
          </Text>
          <TouchableWithoutFeedback onPress={daysRemaining}>
            <View style={styles.evaluateButtonContainer}>
              <Text style={styles.evaluateButtonText}>Check your level</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.resultContainer}>{renderAchievements()}</View>
        <Text style={styles.footerText}>
          Built with{' '}
          <MaterialCommunityIcons name="heart-circle" color="#000" size={30} />{' '}
          by JScrambler & @amanhimself
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffbd12'
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Press-Start2p',
    fontSize: 20,
    marginTop: 50,
    paddingHorizontal: 20,
    lineHeight: 30
  },
  pickerContainer: {
    marginTop: 20,
    backgroundColor: '#00c6ae',
    width: W / 1.2,
    height: W / 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pickerText: {
    fontFamily: 'Press-Start2p',
    fontSize: 14,
    paddingHorizontal: 10,
    lineHeight: 20
  },
  icon: {
    color: '#000'
  },
  showDateContainer: {
    marginTop: 20,
    backgroundColor: '#F95A2C',
    width: W / 1.2,
    height: W / 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',

    alignItems: 'center'
  },
  showDateText: {
    fontFamily: 'Press-Start2p',
    fontSize: 14,
    padding: 10,
    marginTop: 20,
    lineHeight: 20
  },
  evaluateButtonContainer: {
    marginTop: 20,
    backgroundColor: '#1947E5',
    width: W / 1.4,
    height: W / 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  evaluateButtonText: {
    color: '#fff',
    fontFamily: 'Press-Start2p',
    fontSize: 14,
    paddingHorizontal: 10,
    lineHeight: 20
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#FF89BB',
    width: W / 1.2,
    height: W / 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultText: {
    color: '#fff',
    fontFamily: 'Press-Start2p',
    fontSize: 16,
    padding: 15,
    lineHeight: 20
  },
  footerText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Press-Start2p',
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: 40,
    padding: 25,
    lineHeight: 30
  }
});
