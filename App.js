import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export default function App() {
  let [json, setJson] = React.useState('');
  let [parsed, setParsed] = React.useState('');

  React.useEffect(() => {
    async function loadContentsAsync() {
      let asset = Asset.fromModule(require('./example.json.lazy'));
      await asset.downloadAsync();
      let json = await FileSystem.readAsStringAsync(asset.localUri);
      setJson(json);
      try {
        let parsed = JSON.parse(json);
        setParsed(parsed);
      } catch(e) {
        setParsed({ hello: "UNABLE TO PARSE, INVALID JSON!"})
      }
    }

    loadContentsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{json}</Text>
      <Text>{parsed ? `value of "hello" on parsed object: ${parsed.hello}` : ''}</Text>
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
