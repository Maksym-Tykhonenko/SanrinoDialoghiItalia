import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSanrenoStore } from '../sanrenostr/sanrenocntxt';

const { height } = Dimensions.get('window');

const sanrenoDialoghQuestions = [
  {
    id: 1,
    text: 'Who raised Romulus and Remus?',
    answers: ['A shepherd only', 'A she-wolf', 'A lion', 'A goddess'],
    correct: 'A she-wolf',
  },
  {
    id: 2,
    text: 'What unusual event could the Colosseum host?',
    answers: ['Chariot races', 'Naval battles', 'Olympic games', 'Bullfights'],
    correct: 'Naval battles',
  },
  {
    id: 3,
    text: 'Which volcano destroyed Pompeii?',
    answers: [
      'Mount Etna',
      'Mount Vesuvius',
      'Mount Olympus',
      'Mount Stromboli',
    ],
    correct: 'Mount Vesuvius',
  },
  {
    id: 4,
    text: 'Who painted The Birth of Venus?',
    answers: ['Michelangelo', 'Botticelli', 'Raphael', 'Caravaggio'],
    correct: 'Botticelli',
  },
  {
    id: 5,
    text: 'Who guided Dante through Hell?',
    answers: ['Virgil', 'Beatrice', 'Julius Caesar', 'Homer'],
    correct: 'Virgil',
  },
  {
    id: 6,
    text: 'How long did the construction of the Duomo last?',
    answers: [
      'About 100 years',
      'About 200 years',
      'Nearly 600 years',
      '50 years',
    ],
    correct: 'Nearly 600 years',
  },
  {
    id: 7,
    text: 'What phrase comes from Rome’s road network?',
    answers: [
      '“All paths lead to glory”',
      '“All roads lead to Rome”',
      '“Rome was built in a day”',
      '“To Rome and back”',
    ],
    correct: '“All roads lead to Rome”',
  },
  {
    id: 8,
    text: 'Why did Venetians wear masks?',
    answers: [
      'To hide from the sun',
      'For daily anonymity',
      'Only for weddings',
      'To honor the gods',
    ],
    correct: 'For daily anonymity',
  },
  {
    id: 9,
    text: 'Which city did the Medici family transform?',
    answers: ['Rome', 'Venice', 'Florence', 'Naples'],
    correct: 'Florence',
  },
  {
    id: 10,
    text: 'What is at the top of the Pantheon’s dome?',
    answers: ['A lantern', 'A golden statue', 'An oculus', 'A cross'],
    correct: 'An oculus',
  },
  {
    id: 11,
    text: 'Whose house is linked with the famous balcony in Verona?',
    answers: ['Juliet’s', 'Beatrice’s', 'Cleopatra’s', 'Venus’s'],
    correct: 'Juliet’s',
  },
  {
    id: 12,
    text: 'Who used the Roman catacombs?',
    answers: ['Gladiators', 'Early Christians', 'Senators', 'Emperors'],
    correct: 'Early Christians',
  },
  {
    id: 13,
    text: 'What animal symbolizes Venice?',
    answers: ['Eagle', 'Bull', 'Lion', 'Horse'],
    correct: 'Lion',
  },
  {
    id: 14,
    text: 'Which art form is La Scala most famous for?',
    answers: ['Ballet', 'Opera', 'Theater plays', 'Circus'],
    correct: 'Opera',
  },
  {
    id: 15,
    text: 'What did the fall of Tarquin lead to?',
    answers: [
      'A new empire',
      'The Roman Republic',
      'The Roman Empire',
      'The fall of Rome',
    ],
    correct: 'The Roman Republic',
  },
  {
    id: 16,
    text: 'What mythic giant is said to lie under Mount Etna?',
    answers: ['Atlas', 'Enceladus', 'Hercules', 'Cyclops'],
    correct: 'Enceladus',
  },
  {
    id: 17,
    text: 'What material is Michelangelo’s David made of?',
    answers: ['Bronze', 'Marble', 'Gold', 'Wood'],
    correct: 'Marble',
  },
  {
    id: 18,
    text: 'What was the Roman Forum used for?',
    answers: [
      'Gladiator fights',
      'Political and public life',
      'Emperor’s palace',
      'Grain storage',
    ],
    correct: 'Political and public life',
  },
  {
    id: 19,
    text: 'What did Leonardo da Vinci sketch besides paintings?',
    answers: [
      'Cartoons',
      'Inventions and anatomy',
      'Maps only',
      'Religious symbols',
    ],
    correct: 'Inventions and anatomy',
  },
  {
    id: 20,
    text: 'Why is Rome called the Eternal City?',
    answers: [
      'It never sleeps',
      'It survived empires',
      'It is the oldest city',
      'It has eternal sunshine',
    ],
    correct: 'It survived empires',
  },
];

export default function SanrenoQuiz() {
  const [sanrenoDialoghMessages, setSanrenoDialoghMessages] = useState([]);
  const [sanrenoDialoghCurrent, setSanrenoDialoghCurrent] = useState(-1);
  const [sanrenoStarted, setSanrenoStarted] = useState(false);
  const nav = useNavigation();
  const [sanrenoDisabled, setSanrenoDisabled] = useState(false);
  const { isEnabledSanrenoVibration } = useSanrenoStore();

  const sanrenoDialoghFlatRef = useRef(null);

  useEffect(() => {
    if (sanrenoDialoghFlatRef.current && sanrenoDialoghMessages.length > 0) {
      sanrenoDialoghFlatRef.current.scrollToEnd({ animated: true });
    }
  }, [sanrenoDialoghMessages]);

  useEffect(() => {
    setSanrenoDialoghMessages([
      {
        id: Date.now(),
        text: "Hi, I'm Professor! Let's start testing your knowledge!",
        type: 'bot',
      },
    ]);
  }, []);

  useEffect(() => {
    if (
      sanrenoDialoghCurrent >= 0 &&
      sanrenoDialoghQuestions[sanrenoDialoghCurrent]
    ) {
      const q = sanrenoDialoghQuestions[sanrenoDialoghCurrent];
      setSanrenoDialoghMessages(prev => [
        ...prev,
        { id: Date.now(), text: q.text, type: 'bot' },
      ]);
      setSanrenoDisabled(false);
    }
  }, [sanrenoDialoghCurrent]);

  const sanrenoHandleStart = () => {
    setSanrenoStarted(true);
    setSanrenoDialoghMessages(prev => [
      ...prev,
      { id: Date.now(), text: 'Start', type: 'user' },
    ]);

    setTimeout(() => {
      setSanrenoDialoghCurrent(0);
    }, 2000);
  };

  const sanrenoHandleAnswer = answer => {
    setSanrenoDisabled(true);
    setSanrenoDialoghMessages(prev => [
      ...prev,
      { id: Date.now(), text: answer, type: 'user' },
    ]);

    const q = sanrenoDialoghQuestions[sanrenoDialoghCurrent];

    setTimeout(() => {
      if (answer === q.correct) {
        setSanrenoDialoghMessages(prev => [
          ...prev,
          { id: Date.now(), text: 'Correct!', type: 'bot' },
        ]);

        setTimeout(() => {
          setSanrenoDialoghMessages(prev => [
            ...prev,
            { id: Date.now(), text: 'Next question!', type: 'bot' },
          ]);

          setTimeout(() => {
            if (sanrenoDialoghCurrent + 1 < sanrenoDialoghQuestions.length) {
              setSanrenoDialoghCurrent(sanrenoDialoghCurrent + 1);
            } else {
              setSanrenoDialoghMessages(prev => [
                ...prev,
                { id: Date.now(), text: 'Quiz finished! 🎉', type: 'bot' },
              ]);
              setSanrenoDisabled(true);
            }
          }, 1500);
        }, 1500);
      } else {
        if (isEnabledSanrenoVibration) {
          Vibration.vibrate(200);
        }

        setSanrenoDialoghMessages(prev => [
          ...prev,
          { id: Date.now(), text: 'Wrong! Try again.', type: 'bot' },
        ]);
        setSanrenoDisabled(false);
      }
    }, 1000);
  };

  const renderSanrenoMessage = ({ item }) => (
    <LinearGradient
      colors={
        item.type === 'user' ? ['#555555', '#FFFFFF'] : ['#995E01', '#FEF05B']
      }
      style={[
        item.type === 'user'
          ? { borderBottomRightRadius: 0 }
          : { borderBottomLeftRadius: 0 },
        item.type === 'user'
          ? styles.sanrenoUserMessage
          : styles.sanrenoBotMessage,
        { borderRadius: 12, marginBottom: 20 },
      ]}
    >
      <View
        style={[
          styles.sanrenoMessage,
          item.type === 'user'
            ? styles.sanrenoUserMessage
            : styles.sanrenoBotMessage,
        ]}
      >
        <Text style={styles.sanrenoText}>{item.text}</Text>
      </View>
    </LinearGradient>
  );

  const sanrenoCurrentQ = sanrenoDialoghQuestions[sanrenoDialoghCurrent];

  return (
    <ImageBackground
      source={require('../../assets/images/sanremoldrbg.png')}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: height * 0.15,
          zIndex: 1,
        }}
      />
      <View style={styles.sanrenoContainer}>
        <TouchableOpacity
          style={styles.sanrenoBackBtn}
          onPress={() => nav.goBack()}
        >
          <Image source={require('../../assets/images/sanremoback.png')} />
        </TouchableOpacity>
        <View
          style={{
            top: height * 0.06,
            position: 'absolute',
            width: '100%',
            alignSelf: 'center',
            zIndex: 1,
          }}
        >
          <Text style={styles.sanrenoTitle}>QUIZ</Text>
        </View>

        <FlatList
          data={sanrenoDialoghMessages}
          ref={sanrenoDialoghFlatRef}
          renderItem={renderSanrenoMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.sanrenoChat}
          contentContainerStyle={{
            paddingTop: 130,
          }}
          showsVerticalScrollIndicator={false}
        />

        {!sanrenoStarted ? (
          <View style={[styles.sanrenoAnswers, { alignSelf: 'center' }]}>
            <TouchableOpacity activeOpacity={0.8} onPress={sanrenoHandleStart}>
              <ImageBackground
                source={require('../../assets/images/sanremogrdbtn.png')}
                style={styles.sanrenogradbtn}
              >
                <Text style={styles.sanrenogradbtntxt}>START</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        ) : (
          sanrenoCurrentQ && (
            <View style={styles.sanrenoAnswers}>
              {sanrenoCurrentQ.answers.map(a => (
                <TouchableOpacity
                  key={a}
                  onPress={() => sanrenoHandleAnswer(a)}
                  disabled={sanrenoDisabled}
                >
                  <ImageBackground
                    source={require('../../assets/images/sanremoanswcnt.png')}
                    style={styles.sanrenoBtn}
                  >
                    <Text style={styles.sanrenoButtonText}>{a}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  sanrenoContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  sanrenoTitle: {
    fontFamily: 'CrimsonText-Bold',
    color: '#FDB53E',
    fontSize: 24,
    textAlign: 'center',
  },
  sanrenoBackBtn: {
    position: 'absolute',
    left: 30,
    top: height * 0.06,
    zIndex: 100,
  },
  sanrenogradbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#000',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  sanrenogradbtn: {
    width: 198,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sanrenoChat: { flex: 1 },
  sanrenoMessage: {
    marginVertical: 4,
    borderRadius: 12,
    maxWidth: '75%',
    padding: 15,
  },
  sanrenoBotMessage: {
    alignSelf: 'flex-start',
  },
  sanrenoUserMessage: {
    alignSelf: 'flex-end',
  },
  sanrenoText: {
    fontFamily: 'CrimsonText-Regular',
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
  sanrenoAnswers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginBottom: 50,
  },

  sanrenoButtonText: {
    fontFamily: 'CrimsonText-Regular',
    color: '#000',
    fontSize: 15,
    textAlign: 'center',
  },
  sanrenoBtn: {
    width: 160,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
