import React, { useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Animated, View, Text, Image } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";

export function LebibButton() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push('/chat')}
      activeOpacity={0.8}
    >
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
        }}
      >
        <Image 
          source={{ uri: 'https://ik.imagekit.io/q4j9bswkr/lebibBot.png?updatedAt=1761348931531' }}
          style={styles.lebibImage}
          resizeMode="contain"
        />
      </Animated.View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>AI</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 1000,
  },
  lebibImage: {
    width: 80,
    height: 80,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
