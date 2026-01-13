import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { useFeedback } from '../hooks/useFeedback';
import NewHomeScreen from '../screens/NewHomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CollectionsScreen from '../screens/CollectionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { playButtonTap } = useFeedback();

  // Don't render until theme is ready
  if (!theme || !theme.colors) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenListeners={{
          tabPress: () => {
            void playButtonTap();
          },
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBarBackground,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
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
            tabBarLabel: t('navigation.home'),
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: t('navigation.search'),
            tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: t('navigation.favorites'),
            tabBarIcon: ({ color }) => <FavoritesIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Collections"
          component={CollectionsScreen}
          options={{
            tabBarLabel: t('navigation.collections'),
            tabBarIcon: ({ color }) => <CollectionsIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: t('navigation.settings'),
            tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
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

const SearchIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="search" size={24} color={color} />
);

const CollectionsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="collections" size={24} color={color} />
);

const SettingsIcon: React.FC<{ color: string }> = ({ color }) => (
  <Icon name="settings" size={24} color={color} />
);

export default AppNavigator;
