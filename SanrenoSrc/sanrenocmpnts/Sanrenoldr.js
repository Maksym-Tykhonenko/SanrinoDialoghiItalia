import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';

const Sanrenoldr = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/sanremoldrbg.png')}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {Platform.OS === 'ios' ? (
        <Image source={require('../../assets/images/sanrenoldr.png')} />
      ) : (
        <Image
          source={require('../../assets/images/sanremoandlogo.png')}
          style={{ width: 142, height: 213 }}
        />
      )}
      {Platform.OS === 'ios' ? (
        <Text style={styles.sanremoldrtxt}>{`SANRENO 
DIALOGHI D’ITALIA`}</Text>
      ) : (
        <Text style={[styles.sanremoldrtxt, { marginTop: 0 }]}>{`LUXURY 
DIALOGHI D’ITALIA`}</Text>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sanremoldrtxt: {
    fontFamily: 'CrimsonText-SemiBold',
    color: '#FDB53E',
    fontSize: 32,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default Sanrenoldr;
