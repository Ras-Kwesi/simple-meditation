import { Image, StyleSheet, Platform, View, Text } from 'react-native';
 
export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Text>
            Index
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center', // Vertically centers
        alignItems: 'center', // Horizonatlly centers
        color: 'red',

    }
})