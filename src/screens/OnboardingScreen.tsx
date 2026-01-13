import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { useFeedback } from '../hooks/useFeedback';

const { width, height } = Dimensions.get('window');

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  image: ReturnType<typeof require>;
};

interface OnboardingScreenProps {
  onFinish: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { playButtonTap } = useFeedback();
  const slides = useMemo<Slide[]>(
    () => [
      {
        key: 'onboard-01',
        title: t('onboarding.slides.findWords.title'),
        subtitle: t('onboarding.slides.findWords.subtitle'),
        image: require('../assets/images/onboarding/01.png'),
      },
      {
        key: 'onboard-02',
        title: t('onboarding.slides.makePersonal.title'),
        subtitle: t('onboarding.slides.makePersonal.subtitle'),
        image: require('../assets/images/onboarding/02.png'),
      },
      {
        key: 'onboard-03',
        title: t('onboarding.slides.stayReady.title'),
        subtitle: t('onboarding.slides.stayReady.subtitle'),
        image: require('../assets/images/onboarding/03.png'),
      },
      {
        key: 'onboard-04',
        title: t('onboarding.slides.buildCollections.title'),
        subtitle: t('onboarding.slides.buildCollections.subtitle'),
        image: require('../assets/images/onboarding/04.png'),
      },
      {
        key: 'onboard-05',
        title: t('onboarding.slides.setVibe.title'),
        subtitle: t('onboarding.slides.setVibe.subtitle'),
        image: require('../assets/images/onboarding/05.png'),
      },
      {
        key: 'onboard-06',
        title: t('onboarding.slides.startConfidence.title'),
        subtitle: t('onboarding.slides.startConfidence.subtitle'),
        image: require('../assets/images/onboarding/06.png'),
      },
    ],
    [t],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<Slide>>(null);

  const clampIndex = (index: number) =>
    Math.max(0, Math.min(index, slides.length - 1));

  const getSafeIndex = () =>
    Number.isFinite(currentIndexRef.current) ? currentIndexRef.current : 0;

  const setIndex = (index: number) => {
    if (!Number.isFinite(index)) {
      return;
    }
    const nextIndex = clampIndex(Math.round(index));
    if (nextIndex !== currentIndexRef.current) {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
    }
  };

  const handleNext = () => {
    const index = getSafeIndex();
    if (index >= slides.length - 1) {
      onFinish();
      return;
    }
    const nextIndex = index + 1;
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });
  };

  const handleBack = () => {
    const index = getSafeIndex();
    if (index <= 0) {
      return;
    }
    const nextIndex = index - 1;
    flatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });
  };

  const handleSkip = () => {
    onFinish();
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (width <= 0) {
      return;
    }
    setIndex(event.nativeEvent.contentOffset.x / width);
  };

  const handleScrollToIndexFailed = (info: {
    index: number;
    averageItemLength: number;
  }) => {
    const offset = info.averageItemLength * info.index;
    flatListRef.current?.scrollToOffset({ offset, animated: true });
  };

  const styles = useMemo(() => {
    const isDark = theme.name.toLowerCase() === 'dark';
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      gradient: {
        flex: 1,
      },
      topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
        paddingTop: 12,
      },
      skipButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      skipText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
      },
      slide: {
        width,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageCard: {
        width: '100%',
        height: Math.min(height * 0.42, 360),
        backgroundColor: theme.colors.surface,
        borderRadius: 28,
        padding: 24,
        shadowColor: isDark ? '#000000' : '#2B2B2B',
        shadowOpacity: isDark ? 0.3 : 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        elevation: 6,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      textBlock: {
        marginTop: 24,
        alignItems: 'center',
      },
      title: {
        fontSize: 28,
        fontWeight: '700',
        color: theme.colors.text,
        textAlign: 'center',
      },
      subtitle: {
        marginTop: 10,
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.textSecondary,
        textAlign: 'center',
      },
      footer: {
        paddingHorizontal: 24,
        paddingBottom: 20,
      },
      dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
      },
      dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 4,
      },
      actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      actionsSingle: {
        justifyContent: 'center',
      },
      ghostButton: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 22,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        minWidth: 110,
        alignItems: 'center',
      },
      ghostText: {
        color: theme.colors.textSecondary,
        fontSize: 15,
        fontWeight: '600',
      },
      primaryButton: {
        paddingVertical: 14,
        borderRadius: 26,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
      },
      primaryButtonFull: {
        flex: 1,
      },
      primaryButtonWithBack: {
        flex: 1,
        marginLeft: 12,
      },
      primaryText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
      },
    });
  }, [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.gradient}
      >
        <View style={styles.topBar}>
          {currentIndex < slides.length - 1 && (
            <TouchableOpacity
              onPress={() => {
                void playButtonTap();
                handleSkip();
              }}
              style={styles.skipButton}
              activeOpacity={0.8}
            >
              <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
            </TouchableOpacity>
          )}
        </View>

        <Animated.FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          onScrollToIndexFailed={handleScrollToIndexFailed}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [24, 0, 24],
              extrapolate: 'clamp',
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.94, 1, 0.94],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });

            return (
              <View style={styles.slide}>
                <Animated.View
                  style={[
                    styles.imageCard,
                    { transform: [{ translateY }, { scale }], opacity },
                  ]}
                >
                  <Image source={item.image} style={styles.image} />
                </Animated.View>
                <Animated.View
                  style={[
                    styles.textBlock,
                    { transform: [{ translateY }], opacity },
                  ]}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </Animated.View>
              </View>
            );
          }}
        />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((slide, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });
              const dotOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={slide.key}
                  style={[
                    styles.dot,
                    { width: dotWidth, opacity: dotOpacity },
                  ]}
                />
              );
            })}
          </View>

          <View
            style={[
              styles.actions,
              currentIndex === 0 && styles.actionsSingle,
            ]}
          >
            {currentIndex > 0 && (
              <TouchableOpacity
                onPress={() => {
                  void playButtonTap();
                  handleBack();
                }}
                style={styles.ghostButton}
                activeOpacity={0.8}
              >
                <Text style={styles.ghostText}>{t('onboarding.back')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                void playButtonTap();
                handleNext();
              }}
              style={[
                styles.primaryButton,
                currentIndex === 0
                  ? styles.primaryButtonFull
                  : styles.primaryButtonWithBack,
              ]}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryText}>
                {currentIndex === slides.length - 1
                  ? t('onboarding.getStarted')
                  : t('onboarding.next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
