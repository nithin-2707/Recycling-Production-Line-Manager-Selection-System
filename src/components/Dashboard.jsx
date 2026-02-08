import { useState, useMemo } from 'react';
import {
  Title,
  Text,
  Grid,
  Paper,
  Group,
  Badge,
  Stack,
  TextInput,
  Select,
  Button,
  Card,
  Box,
  Tabs,
} from '@mantine/core';
import {
  IconSearch,
  IconTrophy,
  IconUsers,
  IconChartBar,
  IconFilter,
  IconRefresh,
} from '@tabler/icons-react';
import { mockCandidates } from '../data/generateCandidates';
import Leaderboard from './Leaderboard';
import SkillHeatmap from './SkillHeatmap';
import CandidateCards from './CandidateCards';
import StatsCard from './StatsCard';

export default function Dashboard() {
  const [candidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Filter candidates based on search and category
  const filteredCandidates = useMemo(() => {
    let filtered = candidates;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      const categoryRanges = {
        exceptional: [90, 100],
        excellent: [85, 89],
        'very-good': [80, 84],
        good: [75, 79],
      };
      const range = categoryRanges[categoryFilter];
      if (range) {
        filtered = filtered.filter(
          (c) => c.overallScore >= range[0] && c.overallScore <= range[1]
        );
      }
    }

    return filtered;
  }, [candidates, searchQuery, categoryFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const avgCrisis =
      candidates.reduce((sum, c) => sum + c.crisisManagement, 0) / candidates.length;
    const avgSustainability =
      candidates.reduce((sum, c) => sum + c.sustainability, 0) / candidates.length;
    const avgTeamMotivation =
      candidates.reduce((sum, c) => sum + c.teamMotivation, 0) / candidates.length;
    const topPerformers = candidates.filter((c) => c.overallScore >= 85).length;

    return {
      totalCandidates: candidates.length,
      avgCrisis: avgCrisis.toFixed(1),
      avgSustainability: avgSustainability.toFixed(1),
      avgTeamMotivation: avgTeamMotivation.toFixed(1),
      topPerformers,
    };
  }, [candidates]);

  const handleReset = () => {
    setSearchQuery('');
    setCategoryFilter('all');
  };

  return (
    <Box>
      {/* Header */}
      <Box mb={40} style={{ textAlign: 'center' }}>
        <Title
          order={1}
          style={{
            fontSize: '3.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1b263b 0%, #415a77 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Recycling Production Line Manager
        </Title>
        <Text
          size="xl"
          style={{
            color: '#0d1b2a',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Candidate Selection System
        </Text>
      </Box>

      {/* Stats Cards */}
<Grid mb={30}>
  <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
    <StatsCard
      title="Total Candidates"
      value={stats.totalCandidates}
      icon={<IconUsers size={28} />}
      color="#1b263b"
    />
  </Grid.Col>

  <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
    <StatsCard
      title="Top Performers"
      value={stats.topPerformers}
      icon={<IconTrophy size={28} />}
      color="#415a77"
      subtitle="Score ≥ 85"
    />
  </Grid.Col>

  <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
    <StatsCard
      title="Avg Crisis Mgmt"
      value={`${stats.avgCrisis}%`}
      icon={<IconChartBar size={28} />}
      color="#778da9"
    />
  </Grid.Col>

  <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
    <StatsCard
      title="Avg Sustainability"
      value={`${stats.avgSustainability}%`}
      icon={<IconChartBar size={28} />}
      color="#415a77"
    />
  </Grid.Col>
</Grid>


      {/* Filters */}
      <Paper
        p="md"
        mb={30}
        style={{
          background: 'rgb(255, 255, 255)',
          border: '2px solid rgba(65, 90, 119, 0.3)',
          borderRadius: '12px',
        }}
      >
        <Group justify="space-between" wrap="wrap">
          <Group style={{ flex: 1 }}>
            <TextInput
              placeholder="Search by name, email, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<IconSearch size={18} />}
              style={{ minWidth: 300, flex: 1 }}
              styles={{
                input: {
                  background: 'white',
                  border: '2px solid #778da9',
                  color: '#0d1b2a',
                  '&::placeholder': { color: '#778da9' },
                  '&:focus': { borderColor: '#415a77' },
                },
              }}
            />
            <Select
              placeholder="Filter by category"
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value || 'all')}
              leftSection={<IconFilter size={18} />}
              data={[
                { value: 'all', label: 'All Categories' },
                { value: 'exceptional', label: 'Exceptional (90-100)' },
                { value: 'excellent', label: 'Excellent (85-89)' },
                { value: 'very-good', label: 'Very Good (80-84)' },
                { value: 'good', label: 'Good (75-79)' },
              ]}
              style={{ minWidth: 220 }}
              styles={{
                input: {
                  background: 'white',
                  border: '2px solid #778da9',
                  color: '#0d1b2a',
                  '&:focus': { borderColor: '#415a77' },
                },
                dropdown: {
                  background: 'white',
                  border: '2px solid #778da9',
                },
                option: {
                  color: '#0d1b2a',
                  '&[data-selected]': { background: '#778da9', color: 'white' },
                  '&:hover': { background: '#e0e1dd' },
                },
              }}
            />
          </Group>
          <Button
            leftSection={<IconRefresh size={18} />}
            onClick={handleReset}
            variant="light"
            styles={{
              root: {
                background: '#415a77',
                color: 'white',
                border: 'none',
                '&:hover': { background: '#1b263b' },
              },
            }}
          >
            Reset
          </Button>
        </Group>
        {filteredCandidates.length !== candidates.length && (
          <Text size="sm" c="#778da9" mt="sm">
            Showing {filteredCandidates.length} of {candidates.length} candidates
          </Text>
        )}
      </Paper>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        styles={{
          root: { marginBottom: '2rem' },
          list: {
            borderBottom: '3px solid #415a77',
          },
          tab: {
            color: '#778da9',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '1rem 1.5rem',
            '&:hover': {
              background: 'rgba(119, 141, 169, 0.1)',
              color: '#415a77',
            },
            '&[data-active]': {
              color: '#0d1b2a',
              borderColor: '#415a77',
            },
          },
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="leaderboard" leftSection={<IconTrophy size={18} />}>
            Leaderboard
          </Tabs.Tab>
          <Tabs.Tab value="heatmap" leftSection={<IconChartBar size={18} />}>
            Skill Heatmap
          </Tabs.Tab>
          <Tabs.Tab value="candidates" leftSection={<IconUsers size={18} />}>
            All Candidates
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="leaderboard" pt="xl">
          <Leaderboard candidates={filteredCandidates.slice(0, 10)} />
        </Tabs.Panel>

        <Tabs.Panel value="heatmap" pt="xl">
          <SkillHeatmap candidates={filteredCandidates} />
        </Tabs.Panel>

        <Tabs.Panel value="candidates" pt="xl">
          <CandidateCards candidates={filteredCandidates} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
