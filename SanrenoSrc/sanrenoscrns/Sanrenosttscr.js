import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');

import { useSanrenoStore } from '../sanrenostr/sanrenocntxt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sanrenosttscr = () => {
  const nav = useNavigation();
  const {
    isEnabledSanrenoBgMusic,
    setIsEnabledSanrenoBgMusic,
    isEnabledSanrenoVibration,
    setIsEnabledSanrenoVibration,
  } = useSanrenoStore();

  const toggleSanrenoBgMusic = async value => {
    try {
      await AsyncStorage.setItem('sanrenobgmusic', JSON.stringify(value));
      setIsEnabledSanrenoBgMusic(value);
    } catch (error) {
      console.log('Error saving music setting:', error);
    }
  };

  const toggleSanrenoVibration = async value => {
    try {
      await AsyncStorage.setItem('sanrenovibration', JSON.stringify(value));
      setIsEnabledSanrenoVibration(value);
    } catch (error) {
      console.log('Error saving vibration setting:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/sanremoldrbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.sanrenocnt]}>
          <TouchableOpacity
            style={styles.sanrenobackbtn}
            onPress={() => nav.goBack()}
          >
            <Image source={require('../../assets/images/sanremoback.png')} />
          </TouchableOpacity>
          <Text style={styles.sanrenotitle}>SETTINGS</Text>
          <View style={[styles.sanrenogwrp, { marginTop: 48 }]}>
            <Text style={styles.sanrenoswttxt}>Vibration</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#FDB53E' }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                toggleSanrenoVibration(!isEnabledSanrenoVibration)
              }
              value={isEnabledSanrenoVibration}
            />
          </View>
          {Platform.OS === 'ios' && (
            <View style={[styles.sanrenogwrp]}>
              <Text style={styles.sanrenoswttxt}>Music</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#FDB53E' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  toggleSanrenoBgMusic(!isEnabledSanrenoBgMusic)
                }
                value={isEnabledSanrenoBgMusic}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanrenocnt: { paddingTop: height * 0.06, paddingHorizontal: 30 },
  sanrenogradbtn: {
    width: 198,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sanrenogradbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#000',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  sanrenoimg: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  sanrenotitle: {
    fontFamily: 'CrimsonText-Bold',
    color: '#FDB53E',
    fontSize: 24,
    textAlign: 'center',
  },
  sanrenobackbtn: {
    position: 'absolute',
    left: 30,
    top: height * 0.06,
    zIndex: 1,
  },
  sanrenogradcnt: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  sanrenocnttxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#000',
    fontSize: 20,
  },
  sanrenoemptscrtxt: {
    fontFamily: 'CrimsonText-Regular',
    color: '#FDB53E',
    fontSize: 24,
    textAlign: 'center',
  },
  sanrenoswttxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#fff',
    fontSize: 24,
  },
  sanrenogwrp: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Sanrenosttscr;
