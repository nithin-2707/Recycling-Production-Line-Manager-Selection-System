import { Paper, Text, Box, Group, Grid, Tooltip } from '@mantine/core';
import { IconChartDots } from '@tabler/icons-react';

function getScoreColor(score) {
  if (score >= 90) return '#0d1b2a';
  if (score >= 85) return '#1b263b';
  if (score >= 80) return '#415a77';
  if (score >= 75) return '#778da9';
  if (score >= 70) return '#778da9';
  return '#778da9';
}

function getIntensity(score) {
  if (score >= 90) return 1;
  if (score >= 85) return 0.85;
  if (score >= 80) return 0.7;
  if (score >= 75) return 0.55;
  if (score >= 70) return 0.4;
  return 0.25;
}

export default function SkillHeatmap({ candidates }) {
  const topCandidates = candidates.slice(0, 20);

  if (topCandidates.length === 0) {
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
        <Text c="#415a77">No candidates to display in heatmap.</Text>
      </Paper>
    );
  }

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
            <IconChartDots size={28} color="#415a77" />
            <Text size="xl" fw={700} style={{ color: '#0d1b2a' }}>
              Skills Heatmap
            </Text>
          </Group>
          <Text size="sm" style={{ color: '#778da9' }}>
            Top 20 Candidates
          </Text>
        </Group>
      </Box>

      <Box p="xl">
        {/* Legend */}
        <Group justify="center" mb="xl" gap="xl">
          <Group gap="xs">
            <Box
              style={{
                width: 20,
                height: 20,
                background: '#0d1b2a',
                borderRadius: 4,
              }}
            />
            <Text size="sm" style={{ color: '#0d1b2a' }}>
              90-100
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 20,
                height: 20,
                background: '#1b263b',
                borderRadius: 4,
              }}
            />
            <Text size="sm" style={{ color: '#0d1b2a' }}>
              85-89
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 20,
                height: 20,
                background: '#415a77',
                borderRadius: 4,
              }}
            />
            <Text size="sm" style={{ color: '#0d1b2a' }}>
              80-84
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 20,
                height: 20,
                background: '#778da9',
                borderRadius: 4,
              }}
            />
            <Text size="sm" style={{ color: '#0d1b2a' }}>
              75-79
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 20,
                height: 20,
                background: '#778da9',
                borderRadius: 4,
                border: '1px solid #415a77',
              }}
            />
            <Text size="sm" style={{ color: '#0d1b2a' }}>
              70-74
            </Text>
          </Group>
        </Group>

        {/* Header Row */}
        <Grid gutter="xs" mb="sm">
          <Grid.Col span={3}>
            <Text
              size="xs"
              fw={700}
              style={{
                color: '#778da9',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Candidate
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text
              size="xs"
              fw={700}
              ta="center"
              style={{
                color: '#778da9',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Crisis Mgmt
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text
              size="xs"
              fw={700}
              ta="center"
              style={{
                color: '#778da9',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Sustainability
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text
              size="xs"
              fw={700}
              ta="center"
              style={{
                color: '#778da9',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Team Motivation
            </Text>
          </Grid.Col>
        </Grid>

        {/* Heatmap Rows */}
        {topCandidates.map((candidate, index) => (
          <Grid
            key={candidate.id}
            gutter="xs"
            mb="xs"
            style={{
              padding: '0.5rem',
              background:
                index % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              border: '1px solid rgba(65, 90, 119, 0.15)',
            }}
          >
            <Grid.Col span={3}>
              <Group gap="xs">
                <Text
                  size="xs"
                  fw={700}
                  style={{
                    color: '#415a77',
                    minWidth: 20,
                  }}
                >
                  #{candidate.rank}
                </Text>
                <div>
                  <Text size="sm" fw={600} style={{ color: '#0d1b2a' }}>
                    {candidate.name}
                  </Text>
                  <Text size="xs" style={{ color: '#778da9' }}>
                    {candidate.experience}y exp
                  </Text>
                </div>
              </Group>
            </Grid.Col>

            <Grid.Col span={3}>
              <Tooltip
                label={`Crisis Management: ${candidate.crisisManagement}%`}
                position="top"
                withArrow
              >
                <Box
                  style={{
                    height: 60,
                    background: `${getScoreColor(candidate.crisisManagement)}`,
                    opacity: getIntensity(candidate.crisisManagement),
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Text size="lg" fw={700} style={{ color: 'white' }}>
                    {candidate.crisisManagement}
                  </Text>
                </Box>
              </Tooltip>
            </Grid.Col>

            <Grid.Col span={3}>
              <Tooltip
                label={`Sustainability: ${candidate.sustainability}%`}
                position="top"
                withArrow
              >
                <Box
                  style={{
                    height: 60,
                    background: `${getScoreColor(candidate.sustainability)}`,
                    opacity: getIntensity(candidate.sustainability),
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Text size="lg" fw={700} style={{ color: 'white' }}>
                    {candidate.sustainability}
                  </Text>
                </Box>
              </Tooltip>
            </Grid.Col>

            <Grid.Col span={3}>
              <Tooltip
                label={`Team Motivation: ${candidate.teamMotivation}%`}
                position="top"
                withArrow
              >
                <Box
                  style={{
                    height: 60,
                    background: `${getScoreColor(candidate.teamMotivation)}`,
                    opacity: getIntensity(candidate.teamMotivation),
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Text size="lg" fw={700} style={{ color: 'white' }}>
                    {candidate.teamMotivation}
                  </Text>
                </Box>
              </Tooltip>
            </Grid.Col>
          </Grid>
        ))}
      </Box>
    </Paper>
  );
}
