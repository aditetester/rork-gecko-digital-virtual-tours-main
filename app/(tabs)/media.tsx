import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useThemedStyles } from '@/lib/use-themed-styles';
import { Search, Filter, Grid3x3, FileText, Film } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useResponsive } from '@/lib/use-responsive';

type MediaItem = {
  id: string;
  type: 'tour' | 'photo' | 'video' | 'document';
  title: string;
  thumbnail: string;
  size?: string;
  tags: string[];
};

const mockMedia: MediaItem[] = [
  {
    id: '1',
    type: 'tour',
    title: 'Grand Ballroom 360°',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b4?w=400',
    size: '125 MB',
    tags: ['Virtual Tour', 'Ballroom'],
  },
  {
    id: '2',
    type: 'photo',
    title: 'Presidential Suite',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    tags: ['Suite', 'Luxury'],
  },
  {
    id: '3',
    type: 'video',
    title: 'Hotel Walkthrough',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    size: '45 MB',
    tags: ['Video', 'Overview'],
  },
  {
    id: '4',
    type: 'photo',
    title: 'Spa Facilities',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
    tags: ['Spa', 'Wellness'],
  },
  {
    id: '5',
    type: 'document',
    title: 'Hotel Brochure 2025',
    thumbnail: '',
    size: '2.5 MB',
    tags: ['Brochure', 'Sales'],
  },
  {
    id: '6',
    type: 'photo',
    title: 'Restaurant View',
    thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    tags: ['Restaurant', 'Dining'],
  },
];

const categories = ['All', 'Virtual Tours', 'Photos', 'Videos', 'Documents'];

export default function MediaScreen() {
  const { colors, spacing, borderRadius } = useThemedStyles();
  const { isTablet, isLargeTablet, contentMaxWidth } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMedia = mockMedia.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Virtual Tours' && item.type === 'tour') ||
      (selectedCategory === 'Photos' && item.type === 'photo') ||
      (selectedCategory === 'Videos' && item.type === 'video') ||
      (selectedCategory === 'Documents' && item.type === 'document');
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tour':
        return <Grid3x3 size={20} color={colors.accent} />;
      case 'video':
        return <Film size={20} color={colors.accent} />;
      case 'document':
        return <FileText size={20} color={colors.accent} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.centerWrapper, { maxWidth: contentMaxWidth }]}>
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }]}>
        <Text style={[styles.title, { color: colors.text }]}>Media Hub</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Digital asset library</Text>
      </View>

      <View style={[styles.searchContainer, { paddingHorizontal: spacing.lg, marginBottom: spacing.md, gap: spacing.sm }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search media..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
          <Filter size={20} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={[styles.categoryContent, { paddingHorizontal: spacing.lg, gap: spacing.sm }]}
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isActive ? 'transparent' : colors.card,
                  borderColor: colors.border,
                },
                !isActive && {
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                },
                isActive && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              {isActive ? (
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryChipGradient}
                >
                  <Text style={[styles.categoryText, styles.categoryTextActive]}>
                    {category}
                  </Text>
                </LinearGradient>
              ) : (
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {category}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.content} contentContainerStyle={[styles.contentContainer, { padding: spacing.lg }]}>
        <View style={[
          styles.mediaGrid,
          { gap: spacing.md },
          isTablet && { justifyContent: 'flex-start' as const },
        ]}>
          {filteredMedia.map((item) => (
            <TouchableOpacity key={item.id} style={[
              styles.mediaCard,
              { backgroundColor: colors.card, borderRadius: borderRadius.lg },
              isLargeTablet && styles.mediaCardLarge,
              isTablet && !isLargeTablet && styles.mediaCardTablet,
            ]} activeOpacity={0.8}>
              {item.thumbnail ? (
                <Image source={{ uri: item.thumbnail }} style={[styles.mediaThumbnail, { backgroundColor: colors.border }]} />
              ) : (
                <View style={[styles.mediaThumbnail, styles.documentPlaceholder, { backgroundColor: colors.border }]}>
                  <FileText size={32} color={colors.accent} />
                </View>
              )}
              <View style={[styles.mediaOverlay, { top: spacing.sm, right: spacing.sm }]}>
                {item.type !== 'photo' && (
                  <View style={[styles.typeIndicator, { backgroundColor: colors.background + 'CC' }]}>{getTypeIcon(item.type)}</View>
                )}
              </View>
              <View style={[styles.mediaInfo, { padding: spacing.sm }]}>
                <Text style={[styles.mediaTitle, { color: colors.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.size && <Text style={[styles.mediaSize, { color: colors.textSecondary }]}>{item.size}</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center' as const,
  },
  centerWrapper: {
    flex: 1,
    width: '100%',
    alignSelf: 'center' as const,
  },
  header: {
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row' as const,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 16,
  },
  categoryContent: {
    alignItems: 'center' as const,
  },
  categoryChip: {
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
  },
  categoryChipActive: {
    borderWidth: 0,
    padding: 0,
  },
  categoryChipGradient: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
  },
  mediaGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  },
  mediaCard: {
    width: '47%',
    overflow: 'hidden' as const,
    marginBottom: 16,
  },
  mediaCardTablet: {
    width: '31%',
  },
  mediaCardLarge: {
    width: '23%',
  },
  mediaThumbnail: {
    width: '100%',
    height: 150,
  },
  documentPlaceholder: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  mediaOverlay: {
    position: 'absolute' as const,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  mediaInfo: {
  },
  mediaTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  mediaSize: {
    fontSize: 12,
  },
});
