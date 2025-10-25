import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, Modal, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FileText, Droplets, TreeDeciduous, Cloud, TrendingUp, Sparkles, Pencil, ChevronRight, ChevronLeft } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { LebibButton } from "@/components/LebibButton";

const { width } = Dimensions.get('window');

interface EcoStat {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  color: string;
}

export default function DashboardScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const chartAnim = useRef(new Animated.Value(0)).current;
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [pressedCard, setPressedCard] = useState<number | null>(null);
  const [showPredictionForm, setShowPredictionForm] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'year' | 'month' | 'week'>('year');
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [monthScrollOffset, setMonthScrollOffset] = useState<number>(0);
  const [numStudents, setNumStudents] = useState<string>('');
  const [numEvents, setNumEvents] = useState<string>('');
  const [numExams, setNumExams] = useState<string>('');
  const [numClasses, setNumClasses] = useState<string>('');
  const [numTeachers, setNumTeachers] = useState<string>('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(chartAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const ecoStats: EcoStat[] = [
    {
      icon: <FileText color={Colors.primary} size={28} />,
      label: "Paper Saved",
      value: "1,247",
      unit: "sheets",
      color: Colors.primary,
    },
    {
      icon: <Droplets color="#2196F3" size={28} />,
      label: "Water Saved",
      value: "8,542",
      unit: "liters",
      color: "#2196F3",
    },
    {
      icon: <TreeDeciduous color={Colors.success} size={28} />,
      label: "Trees Saved",
      value: "12",
      unit: "trees",
      color: Colors.success,
    },
    {
      icon: <Cloud color="#90A4AE" size={28} />,
      label: "CO₂ Reduced",
      value: "456",
      unit: "kg",
      color: "#90A4AE",
    },
  ];

  const yearData = [
    { year: "2023", value: 10500, months: [
      { month: "Jan", value: 820, weeks: [200, 205, 210, 205] },
      { month: "Feb", value: 750, weeks: [180, 185, 190, 195] },
      { month: "Mar", value: 950, weeks: [235, 240, 235, 240] },
      { month: "Apr", value: 880, weeks: [215, 220, 225, 220] },
      { month: "May", value: 920, weeks: [225, 230, 235, 230] },
      { month: "Jun", value: 800, weeks: [195, 200, 205, 200] },
      { month: "Jul", value: 650, weeks: [160, 165, 162, 163] },
      { month: "Aug", value: 680, weeks: [165, 170, 172, 173] },
      { month: "Sep", value: 990, weeks: [245, 250, 247, 248] },
      { month: "Oct", value: 960, weeks: [235, 240, 242, 243] },
      { month: "Nov", value: 900, weeks: [220, 225, 227, 228] },
      { month: "Dec", value: 700, weeks: [170, 175, 177, 178] },
    ]},
    { year: "2024", value: 9800, months: [
      { month: "Jan", value: 780, weeks: [190, 195, 200, 195] },
      { month: "Feb", value: 720, weeks: [175, 180, 182, 183] },
      { month: "Mar", value: 900, weeks: [220, 225, 227, 228] },
      { month: "Apr", value: 840, weeks: [205, 210, 212, 213] },
      { month: "May", value: 880, weeks: [215, 220, 222, 223] },
      { month: "Jun", value: 760, weeks: [185, 190, 192, 193] },
      { month: "Jul", value: 620, weeks: [150, 155, 157, 158] },
      { month: "Aug", value: 650, weeks: [158, 162, 165, 165] },
      { month: "Sep", value: 950, weeks: [233, 238, 239, 240] },
      { month: "Oct", value: 920, weeks: [225, 230, 232, 233] },
      { month: "Nov", value: 860, weeks: [210, 215, 217, 218] },
      { month: "Dec", value: 670, weeks: [163, 167, 170, 170] },
    ]},
    { year: "2025", value: 9200, months: [
      { month: "Jan", value: 750, weeks: [183, 187, 190, 190] },
      { month: "Feb", value: 690, weeks: [168, 172, 175, 175] },
      { month: "Mar", value: 870, weeks: [213, 217, 220, 220] },
      { month: "Apr", value: 810, weeks: [198, 202, 205, 205] },
      { month: "May", value: 850, weeks: [208, 212, 215, 215] },
      { month: "Jun", value: 730, weeks: [178, 182, 185, 185] },
      { month: "Jul", value: 600, weeks: [147, 150, 151, 152] },
      { month: "Aug", value: 630, weeks: [154, 157, 159, 160] },
      { month: "Sep", value: 920, weeks: [225, 230, 232, 233] },
      { month: "Oct", value: 890, weeks: [218, 222, 225, 225] },
      { month: "Nov", value: 830, weeks: [203, 207, 210, 210] },
      { month: "Dec", value: 650, weeks: [159, 162, 164, 165] },
    ]},
  ];

  const getCurrentChartData = () => {
    if (viewMode === 'year') {
      return yearData.map(y => ({ label: y.year, value: y.value }));
    } else if (viewMode === 'month') {
      const allMonths = yearData[selectedYear].months.map(m => ({ label: m.month, value: m.value }));
      return allMonths.slice(monthScrollOffset, monthScrollOffset + 6);
    } else {
      const weeks = yearData[selectedYear].months[selectedMonth].weeks;
      return weeks.map((w, i) => ({ label: `W${i + 1}`, value: w }));
    }
  };

  const canScrollLeft = viewMode === 'month' && monthScrollOffset > 0;
  const canScrollRight = viewMode === 'month' && monthScrollOffset < 6;

  const handleMonthScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && canScrollLeft) {
      setMonthScrollOffset(0);
    } else if (direction === 'right' && canScrollRight) {
      setMonthScrollOffset(6);
    }
  };

  const chartData = getCurrentChartData();

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }) }],
              },
            ]}
          >
            <View style={styles.headerTop}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Hello, Eco Warrior! 🌍</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>Level 5</Text>
                  <Text style={styles.levelEmoji}>🌱</Text>
                </View>
              </View>
            </View>
            <Text style={styles.subtitle}>Here&apos;s your eco impact</Text>
            <View style={styles.progressBarMini}>
              <Animated.View
                style={[
                  styles.progressBarMiniFill,
                  {
                    width: chartAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '73%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressMiniText}>73% to Level 6</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.predictionCard,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.predictionHeader}>
              <View style={styles.predictionTitleContainer}>
                <TrendingUp color={Colors.primary} size={24} />
                <Text style={styles.predictionTitle}>AI Prediction</Text>
              </View>
              <View style={styles.predictionHeaderRight}>
                <View style={styles.aiChip}>
                  <Sparkles color={Colors.primary} size={14} />
                  <Text style={styles.aiChipText}>Lebib AI</Text>
                </View>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => setShowPredictionForm(true)}
                >
                  <Pencil color={Colors.primary} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.navigationRow}>
              {viewMode !== 'year' && (
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={() => {
                    if (viewMode === 'week') {
                      setViewMode('month');
                    } else if (viewMode === 'month') {
                      setViewMode('year');
                      setMonthScrollOffset(0);
                    }
                  }}
                >
                  <ChevronLeft color={Colors.primary} size={20} />
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              )}
              <Text style={styles.predictionSubtitle}>
                {viewMode === 'year' ? 'Yearly paper usage forecast' : 
                 viewMode === 'month' ? `${yearData[selectedYear].year} - Monthly breakdown` :
                 `${yearData[selectedYear].months[selectedMonth].month} - Weekly breakdown`}
              </Text>
            </View>
            {viewMode === 'month' && (
              <View style={styles.monthNavigationRow}>
                <TouchableOpacity 
                  style={[styles.monthNavButton, !canScrollLeft && styles.monthNavButtonDisabled]}
                  onPress={() => handleMonthScroll('left')}
                  disabled={!canScrollLeft}
                >
                  <ChevronLeft color={canScrollLeft ? Colors.primary : Colors.text.tertiary} size={20} />
                  <Text style={[styles.monthNavText, !canScrollLeft && styles.monthNavTextDisabled]}>Jan-Jun</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.monthNavButton, !canScrollRight && styles.monthNavButtonDisabled]}
                  onPress={() => handleMonthScroll('right')}
                  disabled={!canScrollRight}
                >
                  <Text style={[styles.monthNavText, !canScrollRight && styles.monthNavTextDisabled]}>Jul-Dec</Text>
                  <ChevronRight color={canScrollRight ? Colors.primary : Colors.text.tertiary} size={20} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.chartContainer}>
              <View style={styles.chartYAxis}>
                {[maxValue, maxValue * 0.5, 0].map((value, index) => (
                  <Text key={index} style={styles.yAxisLabel}>
                    {Math.round(value)}
                  </Text>
                ))}
              </View>

              <View style={styles.chart}>
                {chartData.map((item, index) => {
                  const heightPercentage = (item.value / maxValue) * 100;
                  const animatedHeight = chartAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${heightPercentage}%`],
                  });

                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.barContainer}
                      onPress={() => {
                        if (viewMode === 'year') {
                          setSelectedYear(index);
                          setViewMode('month');
                          setMonthScrollOffset(0);
                        } else if (viewMode === 'month') {
                          const actualMonthIndex = monthScrollOffset + index;
                          setSelectedMonth(actualMonthIndex);
                          setViewMode('week');
                        } else {
                          setSelectedBar(index);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <Animated.View
                        style={[
                          styles.bar,
                          {
                            height: animatedHeight,
                            backgroundColor: index === chartData.length - 1 ? Colors.primary : '#B3D9FF',
                          },
                        ]}
                      />
                      <Text style={styles.barLabel}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.predictionInsight}>
              <Text style={styles.insightText}>
                {viewMode === 'year' ? "📈 You're trending to save 15% more paper this year!" :
                 viewMode === 'month' ? "📊 Peak usage in exam months. Consider digital alternatives!" :
                 "💡 Consistent weekly usage. Great for planning!"}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.statsContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.sectionTitle}>Your Eco Impact</Text>
            <View style={styles.statsGrid}>
              {ecoStats.map((stat, index) => (
                <Pressable
                  key={stat.label}
                  onPressIn={() => setPressedCard(index)}
                  onPressOut={() => setPressedCard(null)}
                >
                  <Animated.View
                    style={[
                      styles.statCard,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [50, 0],
                            }),
                          },
                          {
                            scale: pressedCard === index ? 0.95 : 1,
                          },
                        ],
                      },
                    ]}
                  >
                    <View style={styles.statCardRow}>
                      <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                        {stat.icon}
                      </View>
                      <View style={styles.statTextContainer}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statUnit}>{stat.unit}</Text>
                      </View>
                    </View>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </Animated.View>
                </Pressable>
              ))}
            </View>
          </Animated.View>



          <TouchableOpacity style={styles.insightsButton}>
            <Sparkles color={Colors.white} size={20} />
            <Text style={styles.insightsButtonText}>View Detailed Insights</Text>
          </TouchableOpacity>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Today&apos;s Eco Tip</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>
                Using both sides of paper can reduce your paper consumption by 50%. Try enabling double-sided printing!
              </Text>
            </View>
          </View>
        </ScrollView>
        <LebibButton />
      </SafeAreaView>

      <Modal
        visible={selectedBar !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBar(null)}
      >
        <View style={styles.modalOverlay}>
          <Pressable 
            style={styles.modalBackdrop} 
            onPress={() => setSelectedBar(null)}
          />
          <View style={styles.modalContent}>
            {selectedBar !== null && viewMode === 'week' && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Week {selectedBar + 1} Detailed View
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedBar(null)}>
                    <Text style={styles.modalClose}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalStats}>
                  <View style={styles.modalStatItem}>
                    <Text style={styles.modalStatLabel}>Total Sheets</Text>
                    <Text style={styles.modalStatValue}>{chartData[selectedBar].value}</Text>
                  </View>
                  <View style={styles.modalStatItem}>
                    <Text style={styles.modalStatLabel}>Daily Average</Text>
                    <Text style={styles.modalStatValue}>{Math.round(chartData[selectedBar].value / 7)}</Text>
                  </View>
                </View>

                <View style={styles.modalInsight}>
                  <Text style={styles.modalInsightText}>
                    📊 Week {selectedBar + 1} used {chartData[selectedBar].value} sheets of paper.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showPredictionForm}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPredictionForm(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowPredictionForm(false)}>
          <View style={styles.formModalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Configure AI Prediction</Text>
              <TouchableOpacity onPress={() => setShowPredictionForm(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.formDescription}>
                Help Lebib AI predict paper usage more accurately by providing information about your school.
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Number of Students</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 500"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="numeric"
                  value={numStudents}
                  onChangeText={setNumStudents}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Number of Teachers</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 50"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="numeric"
                  value={numTeachers}
                  onChangeText={setNumTeachers}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Number of Classes</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 30"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="numeric"
                  value={numClasses}
                  onChangeText={setNumClasses}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Number of Events Per Year</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 20"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="numeric"
                  value={numEvents}
                  onChangeText={setNumEvents}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Number of Exams Per Year</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 8"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="numeric"
                  value={numExams}
                  onChangeText={setNumExams}
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => {
                  console.log('Saving prediction settings:', {
                    numStudents,
                    numTeachers,
                    numClasses,
                    numEvents,
                    numExams,
                  });
                  setShowPredictionForm(false);
                }}
              >
                <Sparkles color={Colors.white} size={20} />
                <Text style={styles.saveButtonText}>Update AI Model</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTop: {
    marginBottom: 8,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    flex: 1,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.success,
    gap: 6,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  levelEmoji: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  progressBarMini: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarMiniFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 3,
  },
  progressMiniText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  predictionCard: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.success,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    backgroundColor: Colors.background,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  predictionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  predictionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiChipText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  navigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  predictionSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    flex: 1,
  },
  monthNavigationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
    gap: 12,
  },
  monthNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.success,
    flex: 1,
    justifyContent: 'center',
  },
  monthNavButtonDisabled: {
    borderColor: Colors.border,
    opacity: 0.5,
  },
  monthNavText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  monthNavTextDisabled: {
    color: Colors.text.tertiary,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 12,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingBottom: 32,
    width: 45,
  },
  yAxisLabel: {
    fontSize: 11,
    color: Colors.text.tertiary,
    textAlign: 'right',
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 4,
    paddingBottom: 32,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  bar: {
    width: '70%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 4,
  },
  barLabel: {
    position: 'absolute',
    bottom: -28,
    fontSize: 11,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  predictionInsight: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  insightText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  insightHighlight: {
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    width: (width - 52) / 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTextContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  statUnit: {
    fontSize: 11,
    color: Colors.text.tertiary,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    width: width - 48,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  modalClose: {
    fontSize: 28,
    color: Colors.text.tertiary,
    fontWeight: '300' as const,
  },
  modalStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  modalStatItem: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  modalStatValue: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  weekBarContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  weekBarWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  weekBar: {
    width: '70%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 8,
  },
  weekLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  weekValue: {
    fontSize: 11,
    color: Colors.text.tertiary,
  },
  modalInsight: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  modalInsightText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  insightsButton: {
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  insightsButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  formModalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '85%',
    paddingBottom: 40,
  },
  formScroll: {
    paddingHorizontal: 20,
  },
  formDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 24,
    marginTop: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
