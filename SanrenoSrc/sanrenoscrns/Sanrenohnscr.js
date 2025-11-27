import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSanrenoStore } from '../sanrenostr/sanrenocntxt';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
const { height } = Dimensions.get('window');

const Sanrenohnscr = () => {
  const nav = useNavigation();
  const {
    isEnabledSanrenoBgMusic,
    setIsEnabledSanrenoBgMusic,
    setIsEnabledSanrenoVibration,
    volume,
  } = useSanrenoStore();
  const [sanrenoTrackIndex, setSanrenoTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const sanrenoTracks = [
    'italian-traditional-mandolina-music-379530.mp3',
    'italian-traditional-mandolina-music-379530.mp3',
  ];

  useEffect(() => {
    playSanrenoTrack(sanrenoTrackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [sanrenoTrackIndex]);

  const playSanrenoTrack = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const trackPath = sanrenoTracks[index];

    const newPartyDareSound = new Sound(trackPath, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error', error);
        return;
      }

      newPartyDareSound.play(success => {
        if (success) {
          setSanrenoTrackIndex(
            prevIndex => (prevIndex + 1) % sanrenoTracks.length,
          );
        } else {
          console.log('Error ');
        }
      });
      setSound(newPartyDareSound);
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadSanrenoBgMusic();
      loadSanrenoVibration();
    }, []),
  );

  useEffect(() => {
    const setVolumeMusic = async () => {
      try {
        const partyDareMusicValue = await AsyncStorage.getItem(
          'sanrenobgmusic',
        );

        const isPartyMusicOn = JSON.parse(partyDareMusicValue);
        setIsEnabledSanrenoBgMusic(isPartyMusicOn);
        if (sound) {
          sound.setVolume(isPartyMusicOn ? volume : 0);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    setVolumeMusic();
  }, [sound, volume]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(isEnabledSanrenoBgMusic ? volume : 0);
    }
  }, [volume, isEnabledSanrenoBgMusic]);

  const loadSanrenoBgMusic = async () => {
    try {
      const partyDareMusicValue = await AsyncStorage.getItem('sanrenobgmusic');

      const isPartyMusicOn = JSON.parse(partyDareMusicValue);
      setIsEnabledSanrenoBgMusic(isPartyMusicOn);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadSanrenoVibration = async () => {
    try {
      const enigmaNotifValue = await AsyncStorage.getItem('sanrenovibration');
      if (enigmaNotifValue !== null) {
        const isEnigmaNotOn = JSON.parse(enigmaNotifValue);

        setIsEnabledSanrenoVibration(isEnigmaNotOn);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/sanremowlcbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.sanrenocnt]}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/sanremohmlogo.png')}
              style={styles.sanrenoimg}
            />
          ) : (
            <Image
              source={require('../../assets/images/sanremoandlogo.png')}
              style={{ width: 258, height: 378, alignSelf: 'center' }}
            />
          )}
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => nav.navigate('Sanrenoqzscr')}
          >
            <ImageBackground
              source={require('../../assets/images/sanremogrdbtn.png')}
              style={styles.sanrenogradbtn}
            >
              <Text style={styles.sanrenogradbtntxt}>START QUIZ</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => nav.navigate('Sanrenostrscr')}
          >
            <ImageBackground
              source={require('../../assets/images/sanremogrdbtn.png')}
              style={styles.sanrenogradbtn}
            >
              <Text style={styles.sanrenogradbtntxt}>STORIES</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => nav.navigate('Sanrenosvdscr')}
          >
            <ImageBackground
              source={require('../../assets/images/sanremogrdbtn.png')}
              style={styles.sanrenogradbtn}
            >
              <Text style={styles.sanrenogradbtntxt}>SAVED</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              nav.navigate('Sanrenosttscr');
            }}
          >
            <ImageBackground
              source={require('../../assets/images/sanremogrdbtn.png')}
              style={styles.sanrenogradbtn}
            >
              <Text style={styles.sanrenogradbtntxt}>SETTINGS</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanrenocnt: { paddingTop: height * 0.06, paddingHorizontal: 20 },
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
});

export default Sanrenohnscr;
