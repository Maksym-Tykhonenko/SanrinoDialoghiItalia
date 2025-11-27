import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { useSanrenoStore } from '../sanrenostr/sanrenocntxt';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sarenostrdetscr = ({ route }) => {
  const story = route.params;
  const nav = useNavigation();
  const [isSavedSanrenoStr, setIsSavedSanrenoStr] = useState(false);
  const {
    saveSanrenoStory,
    getSanrenoStory,
    deleteSanrenoStory,
    savedSanrenoStr,
  } = useSanrenoStore();

  useFocusEffect(
    useCallback(() => {
      renderSanrenoStory(story);
      getSanrenoStory();
    }, []),
  );

  console.log(savedSanrenoStr);

  const toggleSanrenoSaved = () => {
    if (isSavedSanrenoStr)
      deleteSanrenoStory(story), setIsSavedSanrenoStr(false);
    else saveSanrenoStory(story), setIsSavedSanrenoStr(true);
  };

  const renderSanrenoStory = async item => {
    const jsonValue = await AsyncStorage.getItem('sanrenostories');
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.sanrenoid === item.sanrenoid);

      return data == null
        ? setIsSavedSanrenoStr(false)
        : setIsSavedSanrenoStr(true);
    }
  };

  const shareSanrenoStory = async () => {
    try {
      await Share.share({
        message: `${story.sanrenottl}
${story.sanrenodesc}
`,
      });
    } catch (error) {
      alert.Alert(error.message);
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
          <Text style={styles.sanrenotitle}>STORIES</Text>

          <View
            style={{
              marginTop: 40,
              gap: 20,
            }}
          >
            <LinearGradient
              colors={['#995E01', '#FEF05B']}
              style={{
                borderRadius: 20,
                width: '100%',
              }}
            >
              <View style={styles.sanrenogradcnt}>
                <Text style={styles.sanrenocnttxt}>{story.sanrenottl}</Text>
                <Text style={styles.sanrenodtltxt}>{story.sanrenodesc}</Text>
              </View>
            </LinearGradient>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleSanrenoSaved()}
              >
                <ImageBackground
                  source={require('../../assets/images/sanremogrdbtn.png')}
                  style={styles.sanrenogradbtn}
                >
                  <Text style={styles.sanrenogradbtntxt}>
                    {isSavedSanrenoStr ? 'SAVED' : 'SAVE'}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={shareSanrenoStory}>
                <ImageBackground
                  source={require('../../assets/images/sanremogrdbtn.png')}
                  style={styles.sanrenogradbtn}
                >
                  <Image
                    source={require('../../assets/images/sanremoshr.png')}
                  />
                  <Text style={styles.sanrenogradbtntxt}>SHARE</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanrenocnt: { paddingTop: height * 0.06, paddingHorizontal: 20 },
  sanrenogradbtn: {
    width: 160,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
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
  sanrenodtltxt: {
    fontFamily: 'CrimsonText-SemiBold',
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
});

export default Sarenostrdetscr;
