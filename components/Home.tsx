import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SvgComponent from '../assets/background/back1';
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';


export default function Home({ path }: { path: string }) {
  const [favoritePlayer, setFavoritePlayer] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ pageid: number; title: string; snippet: string; }>>([]);
  const [pageContent, setPageContent] = useState<string>('');

  const handleFavoritePlayerSubmit = async () => {
    try {
      const response = await fetch(`https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&utf8=&srprop=snippet&srsearch=${favoritePlayer.split(' ').join('_')}`);
      const data = await response.json();
      const results = data?.query?.search;
      setSearchResults(results || []);

      if (results?.length) {
        const pageId = results[0].pageid;

        const response2 = await fetch(`https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=5&exsectionformat=plain&format=json&origin=*&utf8=&pageids=${pageId}`);
        const data2 = await response2.json();
        const pageContent = data2?.query?.pages?.[pageId]?.extract;
        setPageContent(pageContent || '');
      }
    } catch (error) {
      alert(`Error al buscar información: ${error}`);
    }
  }

  useEffect(() => {
    handleFavoritePlayerSubmit();
  }, []);

  useEffect(() => {
    handleFavoritePlayerSubmit();
  }, [favoritePlayer]);

  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}>
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.homeScreenFilename]}
          darkColor={Colors.dark.background}
          lightColor={Colors.light.background}>
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <Text
          style={styles.title}
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}>
          ¿Quién es tu jugador favorito?
        </Text>
        <View style={styles.inputContainer}>
        <TextInput
         style={styles.input}
         placeholder="Escribe aquí..."
         placeholderTextColor={Colors.light.text}
         value={favoritePlayer}
         onChangeText={setFavoritePlayer}
       />
<TouchableOpacity
         style={styles.button}
         onPress={handleFavoritePlayerSubmit}
       >
<Text style={styles.buttonText}>Buscar</Text>
</TouchableOpacity>
</View>
{pageContent ? (
      <>
        <Text
          style={styles.title}
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}>
          Extracto de Wikipedia:
        </Text>
        <Text
          style={styles.content}
          lightColor={Colors.light.text}
          darkColor={Colors.dark.text}>
          {pageContent}
        </Text>
        <ExternalLink title="Ver página completa en Wikipedia" href={`https://es.wikipedia.org/?curid=${searchResults[0]?.pageid}`} url={''} />
      </>
    ) : (
      <Text
        style={styles.title}
        lightColor={Colors.light.text}
        darkColor={Colors.dark.text}>
        Sin resultados
      </Text>
    )}
  </View>
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: Colors.light.background,
},
getStartedContainer: {
alignItems: 'center',
marginHorizontal: 50,
},
homeScreenFilename: {
marginVertical: 7,
},
getStartedText: {
fontSize: 17,
lineHeight: 24,
textAlign: 'center',
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
marginHorizontal: 20,
marginVertical: 10,
},
input: {
flex: 1,
borderWidth: 1,
borderColor: Colors.light.text,
borderRadius: 4,
padding: 10,
marginEnd: 10,
},
button: {
backgroundColor: Colors.light.tint,
borderRadius: 4,
paddingVertical: 10,
paddingHorizontal: 20,
},
buttonText: {
color: Colors.light.background,
fontSize: 16,
},
helpContainer: {
marginTop: 15,
marginHorizontal: 20,
},
title: {
fontSize: 20,
fontWeight: 'bold',
marginVertical: 10,
},
content: {
fontSize: 16,
marginBottom: 10,
},
});
