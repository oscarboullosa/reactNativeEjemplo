import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

interface ITeam {
  title: string;
  snippet: string;
  players: IPlayer[];
}

interface IPlayer {
  name: string;
  position: string;
}

interface ITeamPlayersProps {
  teamTitle: string;
  players: IPlayer[];
}
const TeamPlayers = ({ teamTitle, players }: ITeamPlayersProps) => {
    return (
      <ScrollView>
        <View style={styles.teamPlayersContainer}>
          <Text style={styles.teamPlayersTitle}>Plantilla del {teamTitle}</Text>
          {players && players.map((player, index) => (
  <View key={index} style={styles.playerContainer}>
    <Text style={styles.playerName}>{player.name}</Text>
    <Text style={styles.playerPosition}>{player.position}</Text>
  </View>
))}

        </View>
      </ScrollView>
    );
  }
  
const LeagueTeams = () => {
    const [teams, setTeams] = useState<ITeam[]>([]);
    useEffect(() => {
        fetch(`https://es.wikipedia.org/api/rest_v1/page/html/Primera_Divisi%C3%B3n_de_Espa%C3%B1a`)
  .then(response => response.json())
  .then(data => {
    const pages = data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    const teamTitles = page.extract && page.extract.match(/<a.*?title="(.*?)"/g).map((link: string) => {
        const matches = link.match(/title="(.*?)"/);
        return matches ? matches[1] : '';
    });
    return Promise.all(teamTitles ? teamTitles.map((title: string) => {
        return fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${encodeURIComponent(title)}&origin=*`)
          .then(response => response.json())
          .then(data => {
            const pages = data.query.pages;
            const page = pages[Object.keys(pages)[0]];
            const content = page.revisions[0]['*'];
            const regex = /\|\s*short_name\s*=\s*(.*?)\n.*?\|\s*manager\s*=\s*(.*?)\n/gs;
            const match = regex.exec(content);
            const team = {
              title: title,
              snippet: page.extract || '',
              players: [] as { name: string; position: string; }[]
            };
            if (match) {
              const shortName = match[1];
              const manager = match[2];
              const playersRegex = /\|\s*name\s*=\s*(.*?)\n.*?\|\s*position\s*=\s*(.*?)\n/gs;
              let playersMatch;
              while ((playersMatch = playersRegex.exec(content)) !== null) {
                const player = {
                  name: playersMatch[1],
                  position: playersMatch[2]
                };
                team.players.push(player);
              }
            }
            return team;
          });
        }) : []);
    })
  .then(teams => {
    setTeams(teams);
  })
  .catch(error => console.log(error));

      }, []);
      const handleTeamPress = (team: ITeam) => {
        console.log(`Equipo seleccionado: ${team.title}`);
      }
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          {teams && teams.map((team, index) => (
    <TouchableOpacity key={index} onPress={() => handleTeamPress(team)}>
      <Image source={{ uri: `https://source.unsplash.com/random/400x${Math.floor(Math.random() * 200) + 200}/?${team.title}` }}
        style={styles.teamImage}
      />
    </TouchableOpacity>
))}
</ScrollView>
{teams && teams.map((team, index) => (
  <TeamPlayers key={index} teamTitle={team.title} players={team.players} />
))}
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
scrollContainer: {
alignItems: 'center',
justifyContent: 'center',
paddingTop: 20,
paddingBottom: 100,
},
teamImage: {
width: 300,
height: 150,
marginBottom: 10,
},
teamInfo: {
alignItems: 'center',
justifyContent: 'center',
marginBottom: 20,
},
teamTitle: {
fontSize: 20,
fontWeight: 'bold',
textAlign: 'center',
marginBottom: 10,
},
teamSnippet: {
textAlign: 'center',
},
teamPlayersContainer: {
alignItems: 'center',
justifyContent: 'center',
marginHorizontal: 20,
marginBottom: 20,
},
teamPlayersTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
playerContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingHorizontal: 20,
paddingVertical: 10,
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
marginBottom: 10,
width: '100%',
},
playerName: {
fontSize: 16,
fontWeight: 'bold',
},
playerPosition: {
fontSize: 14,
},
});

export default LeagueTeams;