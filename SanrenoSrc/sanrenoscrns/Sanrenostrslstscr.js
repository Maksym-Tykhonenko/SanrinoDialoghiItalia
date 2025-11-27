import { useFocusEffect, useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { sanrenostrsdta } from '../sanrenocnsts/sanrenostrsdta';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback } from 'react';
import { useSanrenoStore } from '../sanrenostr/sanrenocntxt';

const Sanrenostrslstscr = ({ selectedSanrenoScr }) => {
  const nav = useNavigation();
  const { getSanrenoStory, savedSanrenoStr } = useSanrenoStore();

  useFocusEffect(
    useCallback(() => {
      getSanrenoStory();
    }, []),
  );

  let storieslist;

  selectedSanrenoScr === 'svd'
    ? (storieslist = savedSanrenoStr)
    : (storieslist = sanrenostrsdta);

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
          <Text style={styles.sanrenotitle}>
            {selectedSanrenoScr === 'svd' ? 'SAVED' : 'STORIES'}
          </Text>

          {savedSanrenoStr.length === 0 && selectedSanrenoScr === 'svd' && (
            <View
              style={{
                alignItems: 'center',
                marginTop: height * 0.3,
              }}
            >
              <Text style={styles.sanrenoemptscrtxt}>
                {`You don't have any 
saved stories yet!`}
              </Text>
            </View>
          )}

          <View
            style={{
              marginTop: 40,
              gap: 10,
            }}
          >
            {storieslist.map((story, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => nav.navigate('Sarenostrdetscr', story)}
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
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanrenocnt: {
    paddingTop: height * 0.06,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
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
});

export default Sanrenostrslstscr;
