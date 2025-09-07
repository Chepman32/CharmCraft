import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewHomeScreen from '../screens/NewHomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import BuilderScreen from '../screens/BuilderScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#666666',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={NewHomeScreen}
          options={{
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color }) => <FavoritesIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Collections"
          component={CollectionsScreen}
          options={{
            tabBarIcon: ({ color }) => <CollectionsIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Builder"
          component={BuilderScreen}
          options={{
            tabBarIcon: ({ color }) => <BuilderIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Icon components using vector icons
const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="home" size={24} color={color} />
);

const FavoritesIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="favorite" size={24} color={color} />
);

const CollectionsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="collections" size={24} color={color} />
);

const BuilderIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="build" size={24} color={color} />
);

export default AppNavigator;
