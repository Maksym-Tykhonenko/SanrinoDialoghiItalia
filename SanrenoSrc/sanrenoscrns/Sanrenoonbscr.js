import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const Sanrenoonbscr = () => {
  const [currentSanremoSlide, setCurrentSanremoSlide] = useState(0);
  const nav = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/images/sanremowlcbg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.sanrenocnt,
            currentSanremoSlide >= 1 && { paddingTop: height * 0.06 },
          ]}
        >
          {currentSanremoSlide === 0 ? (
            <>
              <Text style={styles.sanrenotitle}>Welcome to </Text>
              {Platform.OS === 'ios' ? (
                <Text style={styles.sanrenosubtitle}>
                  Sanreno Dialoghi d’Italia!
                </Text>
              ) : (
                <Text style={styles.sanrenosubtitle}>
                  Luxury Dialoghi d’Italia!
                </Text>
              )}
            </>
          ) : currentSanremoSlide === 1 ? (
            <>
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../../assets/images/sanrenoldr.png')}
                  style={styles.sanrenoimg}
                />
              ) : (
                <Image
                  source={require('../../assets/images/sanremoandlogo.png')}
                  style={{ width: 81, height: 121, alignSelf: 'center' }}
                />
              )}
            </>
          ) : (
            <>
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../../assets/images/sanrenoldr.png')}
                  style={styles.sanrenoimg}
                />
              ) : (
                <Image
                  source={require('../../assets/images/sanremoandlogo.png')}
                  style={{ width: 81, height: 121, alignSelf: 'center' }}
                />
              )}
            </>
          )}

          <LinearGradient
            colors={['#995E01', '#FEF05B']}
            style={{
              borderRadius: 20,
              width: '92%',
              borderBottomLeftRadius: 0,
            }}
          >
            <View style={styles.sanrenogradcnt}>
              <Text style={styles.sanrenocnttxt}>
                {currentSanremoSlide === 0
                  ? `I am your guide to the world of legends, art and history.
Do you want to know what ancient myths hide?`
                  : currentSanremoSlide === 1
                  ? `I will collect stories for you - from the gods and heroes of antiquity to the secrets of Italian cities.
And then I will test your attention with questions in our conversation`
                  : `Here you can save your favorite legends, listen to music to set the mood, and come back to talk to me at any time.
Ready to embark on a journey through time?`}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <Image source={require('../../assets/images/sanremoonbimg.png')} />

          <View
            style={{
              position: 'absolute',
              bottom: 40,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (currentSanremoSlide < 2) {
                  setCurrentSanremoSlide(currentSanremoSlide + 1);
                } else {
                  nav.replace('Sanrenohnscr');
                }
              }}
            >
              <ImageBackground
                source={require('../../assets/images/sanremogrdbtn.png')}
                style={styles.sanrenogradbtn}
              >
                <Text style={styles.sanrenogradbtntxt}>
                  {currentSanremoSlide === 0
                    ? `NEXT`
                    : currentSanremoSlide === 1
                    ? `NEXT`
                    : `START`}
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
              }}
            >
              {[1, 2, 3].map((item, idx) =>
                currentSanremoSlide === idx ? (
                  <Image
                    source={require('../../assets/images/sanremodotgrd.png')}
                    key={idx}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/sanremodot.png')}
                    key={idx}
                  />
                ),
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanrenocnt: { paddingTop: height * 0.091, paddingHorizontal: 20 },
  sanrenotitle: {
    fontFamily: 'CrimsonText-Regular',
    color: '#FDB53E',
    fontSize: 28,
    textAlign: 'center',
  },
  sanrenosubtitle: {
    fontFamily: 'CrimsonText-SemiBold',
    color: '#FDB53E',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 50,
  },
  sanrenogradcnt: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sanrenocnttxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  sanrenogradbtn: {
    width: 198,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  sanrenogradbtntxt: {
    fontFamily: 'CrimsonText-Bold',
    color: '#000',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  sanrenoimg: {
    width: 81,
    height: 121,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Sanrenoonbscr;
