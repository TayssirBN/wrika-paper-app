import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Clock, Eye } from "lucide-react-native";
import { Colors } from "@/constants/colors";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const craftVideos: Video[] = [
  {
    id: "1",
    title: "Easy Paper Flowers in 5 Minutes",
    thumbnail: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop",
    duration: "5:23",
    views: "2.3M",
    description: "Learn to make beautiful paper flowers using old newspapers and magazines",
    difficulty: "Easy"
  },
  {
    id: "2",
    title: "DIY Paper Gift Box",
    thumbnail: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=400&fit=crop",
    duration: "7:15",
    views: "1.8M",
    description: "Create stunning gift boxes from recycled paper materials",
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Paper Airplane Tricks",
    thumbnail: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?w=600&h=400&fit=crop",
    duration: "4:30",
    views: "5.1M",
    description: "10 amazing paper airplane designs that actually fly",
    difficulty: "Easy"
  },
  {
    id: "4",
    title: "Origami Art for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    duration: "12:40",
    views: "3.2M",
    description: "Step-by-step origami tutorial for creating amazing paper art",
    difficulty: "Medium"
  },
  {
    id: "5",
    title: "Paper Wall Decorations",
    thumbnail: "https://images.unsplash.com/photo-1615870123253-7f6d50d9d409?w=600&h=400&fit=crop",
    duration: "8:20",
    views: "1.5M",
    description: "Transform your room with creative paper wall art",
    difficulty: "Medium"
  },
  {
    id: "6",
    title: "Recycled Paper Crafts",
    thumbnail: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop",
    duration: "10:15",
    views: "2.7M",
    description: "Creative ways to reuse old newspapers and cardboard",
    difficulty: "Easy"
  },
  {
    id: "7",
    title: "Paper Basket Weaving",
    thumbnail: "https://images.unsplash.com/photo-1590376510762-7793864c0c5e?w=600&h=400&fit=crop",
    duration: "15:30",
    views: "980K",
    description: "Weave beautiful storage baskets from old magazines",
    difficulty: "Hard"
  },
  {
    id: "8",
    title: "Paper Card Making Ideas",
    thumbnail: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=400&fit=crop",
    duration: "6:45",
    views: "1.2M",
    description: "Handmade greeting cards with paper crafting techniques",
    difficulty: "Easy"
  },
  {
    id: "9",
    title: "3D Paper Sculptures",
    thumbnail: "https://images.unsplash.com/photo-1587556930979-78d76c8aec33?w=600&h=400&fit=crop",
    duration: "18:20",
    views: "750K",
    description: "Advanced techniques for creating stunning 3D paper art",
    difficulty: "Hard"
  },
  {
    id: "10",
    title: "Paper Jewelry DIY",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
    duration: "9:10",
    views: "1.9M",
    description: "Make unique jewelry pieces using paper beads",
    difficulty: "Medium"
  },
  {
    id: "11",
    title: "Paper Snowflakes Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=600&h=400&fit=crop",
    duration: "5:00",
    views: "4.2M",
    description: "Create intricate snowflake designs from folded paper",
    difficulty: "Easy"
  },
  {
    id: "12",
    title: "Paper Lantern Making",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop",
    duration: "11:30",
    views: "1.1M",
    description: "Beautiful decorative lanterns from recycled paper",
    difficulty: "Medium"
  }
];

export default function CraftsScreen() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  const filteredVideos = craftVideos.filter(video => 
    selectedDifficulty === 'All' || video.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return Colors.success;
      case 'Medium':
        return '#FFB84D';
      case 'Hard':
        return '#FF6B6B';
      default:
        return Colors.text.secondary;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Paper Crafts</Text>
            <Text style={styles.subtitle}>Learn creative paper recycling ideas</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.filterChip,
                  selectedDifficulty === difficulty && styles.filterChipActive
                ]}
                onPress={() => setSelectedDifficulty(difficulty)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedDifficulty === difficulty && styles.filterChipTextActive
                  ]}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>📚 Learn & Create</Text>
            <Text style={styles.statsDescription}>
              Discover amazing ways to turn old paper into beautiful crafts. Each video shows step-by-step instructions!
            </Text>
          </View>

          {filteredVideos.map((video) => (
            <View
              key={video.id}
              style={styles.videoCard}
            >
              <View style={styles.thumbnailContainer}>
                <Image
                  source={{ uri: video.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <Text style={styles.durationBadge}>{video.duration}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(video.difficulty) }]}>
                  <Text style={styles.difficultyText}>{video.difficulty}</Text>
                </View>
              </View>

              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {video.title}
                </Text>
                <Text style={styles.videoDescription} numberOfLines={2}>
                  {video.description}
                </Text>
                <View style={styles.videoMeta}>
                  <View style={styles.metaItem}>
                    <Eye color={Colors.text.tertiary} size={14} />
                    <Text style={styles.metaText}>{video.views} views</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Clock color={Colors.text.tertiary} size={14} />
                    <Text style={styles.metaText}>{video.duration}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.tipCard}>
            <Text style={styles.tipEmoji}>💡</Text>
            <Text style={styles.tipTitle}>Pro Tip</Text>
            <Text style={styles.tipText}>
              Save paper scraps from school projects and use them for these crafts. It&apos;s a great way to reduce waste while being creative!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  filterContainer: {
    marginTop: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  statsDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  videoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.border,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700' as const,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    lineHeight: 24,
  },
  videoDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontWeight: '600' as const,
  },
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 2,
    borderColor: Colors.success,
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
