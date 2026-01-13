import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { GeckoTheme } from '@/constants/theme';
import { Plus, Video, Calendar, Share2, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '@/lib/use-responsive';
import { useThemedStyles } from '@/lib/use-themed-styles';
import { useMemo } from 'react';

type Proposal = {
  id: string;
  title: string;
  tourName: string;
  duration: string;
  createdAt: string;
  thumbnail: string;
};

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Grand Ballroom Proposal',
    tourName: 'Grand Ballroom Virtual Tour',
    duration: '2:45',
    createdAt: '2025-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2b4?w=400',
  },
  {
    id: '2',
    title: 'Presidential Suite Walkthrough',
    tourName: 'Presidential Suite 360°',
    duration: '3:20',
    createdAt: '2025-01-12',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
  },
];

export default function ProposalsScreen() {
  const { isTablet, contentMaxWidth } = useResponsive();
  const theme = useThemedStyles();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  const handleCreateProposal = () => {
    Alert.alert('Create Proposal', 'Select a virtual tour to start recording a new proposal');
  };

  const handleShare = (title: string) => {
    Alert.alert('Share Proposal', `Sharing "${title}"`);
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Proposal',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.centerWrapper, { maxWidth: contentMaxWidth }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Proposals</Text>
          <Text style={styles.subtitle}>Video presentations for clients</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProposal}>
          <Plus size={24} color={theme.colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={[styles.contentContainer, isTablet && styles.contentContainerTablet]}>
        {mockProposals.length === 0 ? (
          <View style={styles.emptyState}>
            <Video size={64} color={theme.colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Proposals Yet</Text>
            <Text style={styles.emptyText}>
              Create your first video proposal by recording a virtual tour walkthrough
            </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={handleCreateProposal}>
              <Text style={styles.emptyButtonText}>Create Proposal</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.proposalsGrid, isTablet && styles.proposalsGridTablet]}>
          {mockProposals.map((proposal) => (
            <View key={proposal.id} style={[styles.proposalCard, isTablet && styles.proposalCardTablet]}>
              <View style={styles.proposalHeader}>
                <View style={styles.videoIcon}>
                  <Video size={20} color={theme.colors.accent} />
                </View>
                <View style={styles.proposalInfo}>
                  <Text style={styles.proposalTitle}>{proposal.title}</Text>
                  <Text style={styles.proposalTour}>{proposal.tourName}</Text>
                  <View style={styles.proposalMeta}>
                    <View style={styles.metaItem}>
                      <Calendar size={12} color={theme.colors.textSecondary} />
                      <Text style={styles.metaText}>{proposal.createdAt}</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <Text style={styles.metaText}>{proposal.duration}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.proposalActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShare(proposal.title)}
                >
                  <Share2 size={18} color={theme.colors.accent} />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(proposal.id, proposal.title)}
                >
                  <Trash2 size={18} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: GeckoTheme.spacing.lg,
  },
  contentContainerTablet: {
    padding: GeckoTheme.spacing.xl,
  },
  proposalsGrid: {
    gap: GeckoTheme.spacing.md,
  },
  proposalsGridTablet: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: GeckoTheme.spacing.xl * 2,
    gap: GeckoTheme.spacing.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: theme.colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: GeckoTheme.spacing.xl,
  },
  emptyButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: GeckoTheme.spacing.lg,
    paddingVertical: GeckoTheme.spacing.md,
    borderRadius: 24,
    marginTop: GeckoTheme.spacing.md,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.background,
    textAlign: 'center' as const,
  },
  proposalCard: {
    backgroundColor: theme.colors.card,
    borderRadius: GeckoTheme.borderRadius.lg,
    padding: GeckoTheme.spacing.md,
    gap: GeckoTheme.spacing.md,
    marginBottom: GeckoTheme.spacing.md,
  },
  proposalCardTablet: {
    width: 'calc(50% - 8px)' as any,
    flexBasis: '48%',
    marginBottom: 0,
  },
  proposalHeader: {
    flexDirection: 'row',
    gap: GeckoTheme.spacing.md,
  },
  videoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proposalInfo: {
    flex: 1,
  },
  proposalTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text,
    marginBottom: 4,
  },
  proposalTour: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: GeckoTheme.spacing.xs,
  },
  proposalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GeckoTheme.spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: theme.colors.border,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  proposalActions: {
    flexDirection: 'row',
    gap: GeckoTheme.spacing.sm,
    paddingTop: GeckoTheme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GeckoTheme.spacing.xs,
    paddingHorizontal: GeckoTheme.spacing.md,
    paddingVertical: GeckoTheme.spacing.sm,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: theme.colors.accent,
    textAlign: 'center' as const,
  },
});
