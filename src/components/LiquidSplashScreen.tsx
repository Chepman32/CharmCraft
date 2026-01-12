import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
} from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { blobStylePresets } from '../constants/splashStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ICON_SIZE = 160;
const NUM_PARTICLES = 140;
const CENTER_X = SCREEN_WIDTH / 2;
const CENTER_Y = SCREEN_HEIGHT / 2;

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const createRng = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const generateBlobPath = (
  rng: () => number,
  size: number,
  irregularity: number,
  points: number
): string => {
  const angleStep = (Math.PI * 2) / points;
  const pathPoints: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const radiusVariation = 1 + (rng() - 0.5) * irregularity;
    const r = size * radiusVariation;
    pathPoints.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  }

  let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

  for (let i = 0; i < pathPoints.length; i++) {
    const p0 = pathPoints[(i - 1 + pathPoints.length) % pathPoints.length];
    const p1 = pathPoints[i];
    const p2 = pathPoints[(i + 1) % pathPoints.length];
    const p3 = pathPoints[(i + 2) % pathPoints.length];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return `${path} Z`;
};

interface LiquidParticle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  delay: number;
  wobbleAmplitude: number;
  blobPath: string;
  isHero: boolean;
  radius: number;
}

interface LiquidSplashScreenProps {
  onAnimationComplete: () => void;
  blobStyle?: string;
}

const LiquidSplashScreen: React.FC<LiquidSplashScreenProps> = ({
  onAnimationComplete,
  blobStyle,
}) => {
  const preset =
    blobStylePresets.find((style) => style.key === blobStyle) ??
    blobStylePresets[0];
  const particles = useMemo<LiquidParticle[]>(() => {

    const nextSeed = createRng(42);
    const list: LiquidParticle[] = [];
    const maxHeroes = Math.max(12, Math.round(NUM_PARTICLES * 0.2));
    let heroCount = 0;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const rng = createRng(Math.floor(nextSeed() * 1_000_000) + i);
      const angle = rng() * Math.PI * 2;
      const distance =
        Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.75 + rng() * 120;

      const startX = CENTER_X + Math.cos(angle) * distance;
      const startY = CENTER_Y + Math.sin(angle) * distance;

      const targetAngle = rng() * Math.PI * 2;
      const targetRadius = Math.sqrt(rng()) * (ICON_SIZE / 2);
      const targetX = CENTER_X + Math.cos(targetAngle) * targetRadius;
      const targetY = CENTER_Y + Math.sin(targetAngle) * targetRadius;

      const sizeRoll = rng();
      let size =
        preset.size.small[0] +
        rng() * (preset.size.small[1] - preset.size.small[0]);
      if (sizeRoll > 1 - preset.size.largeChance) {
        size =
          preset.size.large[0] +
          rng() * (preset.size.large[1] - preset.size.large[0]);
      } else if (
        sizeRoll >
        1 - preset.size.largeChance - preset.size.mediumChance
      ) {
        size =
          preset.size.medium[0] +
          rng() * (preset.size.medium[1] - preset.size.medium[0]);
      }

      let isHero = size >= preset.size.medium[0] || rng() > 0.94;
      if (isHero && heroCount >= maxHeroes) {
        isHero = false;
      }
      if (isHero) {
        heroCount += 1;
      }
      const radius = Math.max(1.5, size * 0.5);

      list.push({
        id: i,
        startX,
        startY,
        targetX,
        targetY,
        size,
        color: preset.colors[Math.floor(rng() * preset.colors.length)],
        delay: rng() * preset.delayMax,
        wobbleAmplitude:
          preset.wobbleMin + rng() * (preset.wobbleMax - preset.wobbleMin),
        blobPath: isHero
          ? generateBlobPath(rng, size, 0.5, 6 + Math.floor(rng() * 4))
          : '',
        isHero,
        radius,
      });
    }

    return list;
  }, [preset]);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const swimAnim = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.6)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const jellyAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const swimLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(swimAnim, {
          toValue: 1,
          duration: preset.swimDuration,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
          useNativeDriver: true,
        }),
        Animated.timing(swimAnim, {
          toValue: 0,
          duration: preset.swimDuration,
          easing: Easing.bezier(0.4, 0, 0.6, 1),
          useNativeDriver: true,
        }),
      ])
    );

    swimLoop.start();

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start(() => {
      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(iconScale, {
            toValue: 1.1,
            duration: 120,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(iconScale, {
            toValue: 1,
            tension: 240,
            friction: 9,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(jellyAnim, {
            toValue: 1,
            duration: 220,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(jellyAnim, {
            toValue: 0,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(iconScale, {
              toValue: preset.zoomScale,
              duration: 500,
              easing: Easing.bezier(0.5, 0, 1, 1),
              useNativeDriver: true,
            }),
            Animated.timing(splashOpacity, {
              toValue: 0,
              duration: 380,
              delay: 120,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
          ]).start(() => {
            swimLoop.stop();
            onAnimationComplete();
          });
        }, 120);
      });
    });

    return () => {
      swimLoop.stop();
    };
  }, [
    iconOpacity,
    iconScale,
    jellyAnim,
    onAnimationComplete,
    preset.swimDuration,
    preset.zoomScale,
    progressAnim,
    splashOpacity,
    swimAnim,
  ]);

  const iconScaleX = jellyAnim.interpolate({
    inputRange: [0, 0.4, 0.7, 1],
    outputRange: [1, 1.18, 0.92, 1],
  });

  const iconScaleY = jellyAnim.interpolate({
    inputRange: [0, 0.4, 0.7, 1],
    outputRange: [1, 0.85, 1.12, 1],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: preset.background, opacity: splashOpacity },
      ]}
    >
      <Svg
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        {particles.map((particle) => {
          const arriveStart = particle.delay;
          const arriveMid = Math.min(1, particle.delay + 0.6);
          const arriveEnd = Math.min(1, particle.delay + 0.78);
          const arriveMidClamped = Math.min(arriveMid, arriveEnd);

          const overshootX = particle.isHero
            ? particle.targetX +
              (particle.targetX - particle.startX) * preset.overshoot
            : particle.targetX;
          const overshootY = particle.isHero
            ? particle.targetY +
              (particle.targetY - particle.startY) * preset.overshoot
            : particle.targetY;

          const translateX = progressAnim.interpolate({
            inputRange: [
              0,
              arriveStart,
              arriveMidClamped,
              arriveEnd,
              1,
            ],
            outputRange: [
              particle.startX,
              particle.startX,
              overshootX,
              particle.targetX,
              particle.targetX,
            ],
            extrapolate: 'clamp',
          });

          const translateY = progressAnim.interpolate({
            inputRange: [
              0,
              arriveStart,
              arriveMidClamped,
              arriveEnd,
              1,
            ],
            outputRange: [
              particle.startY,
              particle.startY,
              overshootY,
              particle.targetY,
              particle.targetY,
            ],
            extrapolate: 'clamp',
          });

          const opacity = progressAnim.interpolate({
            inputRange: [
              0,
              arriveStart,
              Math.min(1, particle.delay + 0.1),
              1,
            ],
            outputRange: [0, 0, 1, 1],
            extrapolate: 'clamp',
          });

          if (!particle.isHero) {
            return (
              <AnimatedCircle
                key={particle.id}
                cx={translateX}
                cy={translateY}
                r={particle.radius}
                fill={particle.color}
                opacity={opacity}
              />
            );
          }

          const swimX = swimAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [
              -particle.wobbleAmplitude,
              particle.wobbleAmplitude,
              -particle.wobbleAmplitude,
            ],
          });

          const swimY = swimAnim.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [
              0,
              particle.wobbleAmplitude * 0.5,
              0,
              -particle.wobbleAmplitude * 0.5,
              0,
            ],
          });

          const arrivalSquash = progressAnim.interpolate({
            inputRange: [
              arriveMidClamped,
              Math.min(1, particle.delay + 0.72),
              Math.min(1, particle.delay + 0.82),
              1,
            ],
            outputRange: [1, 1.25, 0.9, 1],
            extrapolate: 'clamp',
          });

          const arrivalStretch = progressAnim.interpolate({
            inputRange: [
              arriveMidClamped,
              Math.min(1, particle.delay + 0.72),
              Math.min(1, particle.delay + 0.82),
              1,
            ],
            outputRange: [1, 0.85, 1.15, 1],
            extrapolate: 'clamp',
          });

          return (
            <AnimatedG
              key={particle.id}
              opacity={opacity}
              transform={[
                { translateX: Animated.add(translateX, swimX) },
                { translateY: Animated.add(translateY, swimY) },
                { scaleX: arrivalSquash },
                { scaleY: arrivalStretch },
              ]}
            >
              <Path d={particle.blobPath} fill={particle.color} opacity={0.85} />
            </AnimatedG>
          );
        })}
      </Svg>

      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: iconOpacity,
            transform: [
              { scale: iconScale },
              { scaleX: iconScaleX },
              { scaleY: iconScaleY },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/icons/icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0b1020',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});

export default LiquidSplashScreen;
