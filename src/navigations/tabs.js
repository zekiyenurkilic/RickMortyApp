import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import EpisodesScreen from '../components/screens/episodes/EpisodesScreen';
import FavoriteScreen from '../components/screens/FavoriteScreen';
import CharacterDetailsScreen from '../components/screens/CharacterDetailsScreen';
import EpisodeDetailsScreen from '../components/screens/EpisodeDetailsScreen';
import { COLORS, ROUTES } from '../constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EpisodesScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        name={ROUTES.EPISODES}
        component={EpisodesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        name={ROUTES.EPISODE_DETAILS}
        component={EpisodeDetailsScreen}
      />
       <Stack.Screen
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        name={ROUTES.CHARACTER_DETAILS}
        component={CharacterDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 85,
          ...styles.shadow,
        },
      }}>
      
      <Tab.Screen
        name={ROUTES.EPISODES}
        component={EpisodesScreenNavigator}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../assets/home.png')}
                style={{
                  tintColor: focused ? COLORS.activeIconColor : COLORS.black,
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          ),
        }}
      />



      <Tab.Screen
        name={ROUTES.FAVORITE}
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../assets/favorite.png')}
                style={{
                  tintColor: focused ? COLORS.activeIconColor : COLORS.black,
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          ),
        }}
      />
  
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  
});
