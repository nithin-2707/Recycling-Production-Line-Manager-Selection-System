import { Paper, Table, Badge, Group, Text, Avatar, Box, Progress } from '@mantine/core';
import { IconMedal, IconTrophy, IconAward } from '@tabler/icons-react';

function getCategoryColor(score) {
  if (score >= 90) return '#0d1b2a';
  if (score >= 85) return '#1b263b';
  if (score >= 80) return '#415a77';
  if (score >= 75) return '#778da9';
  return '#778da9';
}

function getCategoryLabel(score) {
  if (score >= 90) return 'Exceptional';
  if (score >= 85) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 75) return 'Good';
  return 'Acceptable';
}

function getRankIcon(rank) {
  if (rank === 1) return <IconTrophy size={24} color="#0d1b2a" />;
  if (rank === 2) return <IconMedal size={24} color="#1b263b" />;
  if (rank === 3) return <IconMedal size={24} color="#415a77" />;
  return null;
}

export default function Leaderboard({ candidates }) {
  if (!candidates || candidates.length === 0) {
    return (
      <Paper
        p="xl"
        style={{
          background: 'rgb(255, 255, 255)',
          border: '2px solid rgba(65, 90, 119, 0.3)',
          borderRadius: '16px',
          textAlign: 'center',
        }}
      >
        <Text c="#415a77">No candidates found matching your criteria.</Text>
      </Paper>
    );
  }

  const rows = candidates.map((candidate, index) => {
    const rankIcon = getRankIcon(candidate.rank);
    const categoryColor = getCategoryColor(candidate.overallScore);

    return (
      <Table.Tr
        key={candidate.id}
        style={{
          background: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
          borderBottom: '1px solid rgba(65, 90, 119, 0.2)',
        }}
      >
        <Table.Td>
          <Group gap="xs">
            {rankIcon || (
              <Text
                size="lg"
                fw={700}
                style={{
                  color: '#415a77',
                  minWidth: 30,
                  textAlign: 'center',
                }}
              >
                {candidate.rank}
              </Text>
            )}
          </Group>
        </Table.Td>

        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={40}
              radius="xl"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}55, ${categoryColor}33)`,
                color: 'white',
                fontWeight: 700,
              }}
            >
              {candidate.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Avatar>
            <div>
              <Text size="sm" fw={600} style={{ color: '#0d1b2a' }}>
                {candidate.name}
              </Text>
              <Text size="xs" style={{ color: '#778da9' }}>
                {candidate.currentRole}
              </Text>
            </div>
          </Group>
        </Table.Td>

        <Table.Td>
          <Text size="sm" style={{ color: '#0d1b2a' }}>
            {candidate.experience} years
          </Text>
        </Table.Td>

        <Table.Td>
          <Box style={{ width: '100%' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" style={{ color: '#778da9' }}>
                Crisis
              </Text>
              <Text size="xs" fw={600} style={{ color: '#0d1b2a' }}>
                {candidate.crisisManagement}%
              </Text>
            </Group>
            <Progress
              value={candidate.crisisManagement}
              size="sm"
              radius="xl"
              styles={{
                root: { background: '#ddd' },
                section: { background: '#778da9' },
              }}
            />
          </Box>
        </Table.Td>

        <Table.Td>
          <Box style={{ width: '100%' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" style={{ color: '#778da9' }}>
                Sustainability
              </Text>
              <Text size="xs" fw={600} style={{ color: '#0d1b2a' }}>
                {candidate.sustainability}%
              </Text>
            </Group>
            <Progress
              value={candidate.sustainability}
              size="sm"
              radius="xl"
              styles={{
                root: { background: '#ddd' },
                section: { background: '#1b263b' },
              }}
            />
          </Box>
        </Table.Td>

        <Table.Td>
          <Box style={{ width: '100%' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" style={{ color: '#778da9' }}>
                Team
              </Text>
              <Text size="xs" fw={600} style={{ color: '#0d1b2a' }}>
                {candidate.teamMotivation}%
              </Text>
            </Group>
            <Progress
              value={candidate.teamMotivation}
              size="sm"
              radius="xl"
              styles={{
                root: { background: '#ddd' },
                section: { background: '#415a77' },
              }}
            />
          </Box>
        </Table.Td>

        <Table.Td>
          <Badge
            size="lg"
            radius="md"
            variant="light"
            style={{
              background: `${categoryColor}22`,
              color: categoryColor,
              border: `1px solid ${categoryColor}44`,
              fontWeight: 700,
            }}
          >
            {candidate.overallScore}
          </Badge>
        </Table.Td>

        <Table.Td>
          <Badge
            size="md"
            radius="md"
            variant="light"
            style={{
              background: `${categoryColor}11`,
              color: categoryColor,
              border: `1px solid ${categoryColor}33`,
            }}
          >
            {getCategoryLabel(candidate.overallScore)}
          </Badge>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper
      style={{
        background: 'rgb(255, 255, 255)',
        border: '2px solid rgba(65, 90, 119, 0.3)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        p="lg"
        style={{
          background: 'rgba(119, 141, 169, 0.15)',
          borderBottom: '2px solid rgba(65, 90, 119, 0.3)',
        }}
      >
        <Group justify="space-between">
          <Group>
            <IconAward size={28} color="#415a77" />
            <Text
              size="xl"
              fw={700}
              style={{
                color: '#0d1b2a',
              }}
            >
              Top 10 Candidates
            </Text>
          </Group>
          <Badge
            size="lg"
            radius="md"
            variant="light"
            style={{
              background: 'rgba(65, 90, 119, 0.2)',
              color: '#0d1b2a',
              border: '2px solid rgba(65, 90, 119, 0.4)',
            }}
          >
            {candidates.length} Results
          </Badge>
        </Group>
      </Box>

      <Table
        highlightOnHover
        verticalSpacing="md"
        horizontalSpacing="lg"
        styles={{
          table: {
            background: 'transparent',
          },
        }}
      >
        <Table.Thead>
          <Table.Tr
            style={{
              background: 'rgba(65, 90, 119, 0.15)',
              borderBottom: '2px solid rgba(65, 90, 119, 0.3)',
            }}
          >
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              RANK
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              CANDIDATE
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              EXPERIENCE
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              CRISIS MGMT
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              SUSTAINABILITY
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              TEAM MOTIVATION
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              SCORE
            </Table.Th>
            <Table.Th style={{ color: '#415a77', fontWeight: 700, fontSize: '0.75rem' }}>
              CATEGORY
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
