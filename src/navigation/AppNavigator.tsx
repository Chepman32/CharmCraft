import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
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

// Simple icon components using text
const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 20, color }}>🏠</Text>
);

const FavoritesIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 20, color }}>❤️</Text>
);

const CollectionsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 20, color }}>📚</Text>
);

const BuilderIcon: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ fontSize: 20, color }}>🔧</Text>
);

export default AppNavigator;
