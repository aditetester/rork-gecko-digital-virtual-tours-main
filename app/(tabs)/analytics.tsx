import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { GeckoTheme } from '@/constants/theme';
import { TrendingUp, Eye, Clock, Globe } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '@/lib/use-responsive';
import { useThemedStyles } from '@/lib/use-themed-styles';
import { useMemo } from 'react';

export default function AnalyticsScreen() {
  const { isTablet, contentMaxWidth } = useResponsive();
  const theme = useThemedStyles();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.centerWrapper, { maxWidth: contentMaxWidth }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Tour Performance Insights</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.statsGrid, isTablet && styles.statsGridTablet]}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Eye size={24} color={theme.colors.accent} />
            </View>
            <Text style={styles.statValue}>12,458</Text>
            <Text style={styles.statLabel}>Total Views</Text>
            <View style={styles.statChange}>
              <TrendingUp size={14} color={theme.colors.success} />
              <Text style={styles.statChangeText}>+23%</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Clock size={24} color={theme.colors.accent} />
            </View>
            <Text style={styles.statValue}>4m 32s</Text>
            <Text style={styles.statLabel}>Avg. Duration</Text>
            <View style={styles.statChange}>
              <TrendingUp size={14} color={theme.colors.success} />
              <Text style={styles.statChangeText}>+12%</Text>
            </View>
          </View>
        </View>

        <View style={[styles.chartsRow, isTablet && styles.chartsRowTablet]}>
        <View style={[styles.chartCard, isTablet && styles.chartCardTablet]}>
          <Text style={styles.chartTitle}>Views Over Time</Text>
          <Text style={styles.chartSubtitle}>Last 30 days</Text>
          <View style={styles.chartPlaceholder}>
            <View style={styles.barChart}>
              {[45, 70, 55, 80, 60, 90, 75].map((height, index) => (
                <View
                  key={index}
                  style={[styles.bar, { height: `${height}%` }]}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.chartCard, isTablet && styles.chartCardTablet]}>
          <Text style={styles.chartTitle}>Traffic Sources</Text>
          <Text style={styles.chartSubtitle}>Where your viewers come from</Text>
          <View style={styles.sourcesList}>
            {[
              { source: 'Direct', percentage: 45, color: theme.colors.accent },
              { source: 'Social Media', percentage: 30, color: '#3B82F6' },
              { source: 'Email', percentage: 15, color: '#10B981' },
              { source: 'Other', percentage: 10, color: theme.colors.textSecondary },
            ].map((item, index) => (
              <View key={index} style={styles.sourceItem}>
                <View style={styles.sourceInfo}>
                  <View style={[styles.sourceDot, { backgroundColor: item.color }]} />
                  <Text style={styles.sourceLabel}>{item.source}</Text>
                </View>
                <Text style={styles.sourcePercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.locationHeader}>
            <Globe size={20} color={theme.colors.accent} />
            <Text style={styles.chartTitle}>Top Countries</Text>
          </View>
          <View style={styles.countryList}>
            {[
              { country: 'United States', views: 4520 },
              { country: 'United Kingdom', views: 2890 },
              { country: 'Germany', views: 1760 },
              { country: 'France', views: 1450 },
              { country: 'Canada', views: 890 },
            ].map((item, index) => (
              <View key={index} style={styles.countryItem}>
                <Text style={styles.countryRank}>{index + 1}</Text>
                <Text style={styles.countryName}>{item.country}</Text>
                <Text style={styles.countryViews}>{item.views.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useThemedStyles>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center' as const,
  },
  centerWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center' as const,
  },
  header: {
    paddingHorizontal: GeckoTheme.spacing.lg,
    paddingVertical: GeckoTheme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: GeckoTheme.spacing.lg,
    gap: GeckoTheme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: GeckoTheme.spacing.md,
    flexWrap: 'wrap' as const,
  },
  statsGridTablet: {
    flexWrap: 'nowrap' as const,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: theme.colors.card,
    borderRadius: GeckoTheme.borderRadius.lg,
    padding: GeckoTheme.spacing.md,
  },
  statIcon: {
    marginBottom: GeckoTheme.spacing.sm,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: theme.colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: GeckoTheme.spacing.sm,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: theme.colors.success,
  },
  chartsRow: {
    flexDirection: 'column' as const,
    gap: GeckoTheme.spacing.md,
  },
  chartsRowTablet: {
    flexDirection: 'row' as const,
  },
  chartCard: {
    backgroundColor: theme.colors.card,
    borderRadius: GeckoTheme.borderRadius.lg,
    padding: GeckoTheme.spacing.md,
  },
  chartCardTablet: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  chartSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginBottom: GeckoTheme.spacing.md,
  },
  chartPlaceholder: {
    height: 180,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    gap: 8,
  },
  bar: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    borderRadius: 4,
    minHeight: 20,
  },
  sourcesList: {
    gap: GeckoTheme.spacing.sm,
  },
  sourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: GeckoTheme.spacing.sm,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GeckoTheme.spacing.sm,
  },
  sourceDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  sourceLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  sourcePercentage: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GeckoTheme.spacing.sm,
    marginBottom: GeckoTheme.spacing.md,
  },
  countryList: {
    gap: GeckoTheme.spacing.sm,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: GeckoTheme.spacing.sm,
    gap: GeckoTheme.spacing.md,
  },
  countryRank: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.accent,
    width: 24,
  },
  countryName: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
  countryViews: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
  },
});
