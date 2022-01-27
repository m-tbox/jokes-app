/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import getJokesFromApi from './services/api';
import images from './theme/images';


const Button = ({ title, onPressButton, buttonStyles, titleStyles }) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyles]}
      onPress={onPressButton}
    >
      <Text style={[styles.buttonTitle, titleStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [joke, setJoke] = useState(null);
  const [fetching, setFetching] = useState(false);

  const getJoke = async () => {
    setFetching(true)

    let randomJoke = await getJokesFromApi()
    
    setFetching(false)
    setJoke(randomJoke)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={styles.content}
      >
        <Image style={styles.logoImage} source={images.logo} />

        <Button
          title={'Generate Joke'}
          onPressButton={getJoke}
        />

        {
          joke &&
          <View style={styles.jokeContainer}>
            <Text style={styles.jokeText}>
              {joke}
            </Text>
          </View>
        }
        {
          fetching &&  <ActivityIndicator size="large" />
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mainContainer: {
    backgroundColor: '#FEEBED',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: '30%',
    width: '80%',
  },
  buttonContainer: {
    backgroundColor: '#344181',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 20,
    width: '50%',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Apple Color Emoji' : 'Roboto'
  },
  jokeText: {
    color: '#344181',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Chalkduster' : 'normal',
  },
  jokeContainer: {
    paddingHorizontal: 10,
    width: '90%'
  }
});

export default App;
