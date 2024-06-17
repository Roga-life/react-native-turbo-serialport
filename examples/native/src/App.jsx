import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSerialport } from '@serserm/react-native-turbo-serialport';

export function App() {
  const [device, setDevice] = useState('');
  const [data, setData] = useState('');
  const serialport = useSerialport({
    onError: ({ errorMessage }) => {
      Alert.alert('Error', `${errorMessage}`);
    },
    onConnected: ({ id, portInterface }) => {
      setDevice(`id ${id} ${portInterface} +`);
    },
    onDisconnected: ({ id, portInterface }) => {
      setDevice(`id ${id} ${portInterface} -`);
    },
    onDeviceAttached: ({ id }) => {
      setDevice(`id ${id}`);
    },
    onReadData: ({ data }) => {
      setData(prev => `${prev}${data}`);
    },
  });

  useEffect(() => {
    serialport.listDevices().then(res => {
      if (res?.length) {
        const { isSupported, deviceId, deviceName, manufacturerName } = res[0];
        setDevice(
          `${isSupported}\n${deviceId}\n${deviceName}\n${manufacturerName}`,
        );
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center' }}>{`Result\n${device}`}</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={{ textAlign: 'center' }}>{`${data}`}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
