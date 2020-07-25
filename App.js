import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: '__DSN__',
  enableInExpoDevelopment: true,
  debug: true,
});

Sentry.Native.setRelease(Updates.manifest.revisionId);

export default function App() {

  handleCrash = () => {
    throw new Error('Test Error');
  }

  handleForceUpdate = async () => {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button onPress={handleCrash} title="Crash Now" />
      <Text>Release: {Updates.manifest.revisionId}</Text>
      <Button onPress={handleForceUpdate} title="Force Update" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
