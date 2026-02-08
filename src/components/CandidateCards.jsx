import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Grid,
  Avatar,
  Box,
  Divider,
  Button,
} from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconCertificate,
  IconShare,
} from '@tabler/icons-react';

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

export default function CandidateCards({ candidates }) {
  if (!candidates || candidates.length === 0) {
    return (
      <Card
        shadow="sm"
        p="xl"
        radius="md"
        style={{
          background: 'rgb(255, 255, 255)',
          border: '2px solid rgba(65, 90, 119, 0.3)',
          textAlign: 'center',
        }}
      >
        <Text c="#415a77">No candidates found matching your criteria.</Text>
      </Card>
    );
  }

  return (
    <Grid gutter="lg">
      {candidates.map((candidate) => {
        const categoryColor = getCategoryColor(candidate.overallScore);

        return (
          <Grid.Col key={candidate.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <Card
              shadow="md"
              radius="lg"
              style={{
                background: 'rgb(255, 255, 255)',
                border: '2px solid rgba(65, 90, 119, 0.3)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Rank Badge */}
              <Box
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 10,
                }}
              >
                <Badge
                  size="lg"
                  radius="md"
                  variant="filled"
                  style={{
                    background: categoryColor,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    padding: '8px 12px',
                  }}
                >
                  Rank #{candidate.rank}
                </Badge>
              </Box>

              {/* Header with Avatar */}
              <Group mb="lg" mt="sm">
                <Avatar
                  size={80}
                  radius="xl"
                  style={{
                    background: `linear-gradient(135deg, ${categoryColor}66, ${categoryColor}33)`,
                    color: categoryColor,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    border: `3px solid ${categoryColor}44`,
                  }}
                >
                  {candidate.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar>
                <Stack gap={4} style={{ flex: 1 }}>
                  <Text size="lg" fw={700} style={{ color: '#0d1b2a' }}>
                    {candidate.name}
                  </Text>
                  <Text size="sm" style={{ color: '#778da9' }}>
                    {candidate.currentRole}
                  </Text>
                  <Group gap="xs" mt={4}>
                    <Badge
                      size="sm"
                      radius="md"
                      variant="light"
                      style={{
                        background: `${categoryColor}22`,
                        color: categoryColor,
                        border: `1px solid ${categoryColor}44`,
                      }}
                    >
                      {getCategoryLabel(candidate.overallScore)}
                    </Badge>
                  </Group>
                </Stack>
              </Group>

              <Divider
                mb="md"
                style={{ borderColor: 'rgba(65, 90, 119, 0.2)' }}
              />

              {/* Contact Info */}
              <Stack gap="xs" mb="md">
                <Group gap="xs">
                  <IconMail size={16} color="#778da9" />
                  <Text size="sm" style={{ color: '#0d1b2a' }}>
                    {candidate.email}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconPhone size={16} color="#778da9" />
                  <Text size="sm" style={{ color: '#0d1b2a' }}>
                    {candidate.phone}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconMapPin size={16} color="#778da9" />
                  <Text size="sm" style={{ color: '#0d1b2a' }}>
                    {candidate.location}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconBriefcase size={16} color="#778da9" />
                  <Text size="sm" style={{ color: '#0d1b2a' }}>
                    {candidate.experience} years experience
                  </Text>
                </Group>
              </Stack>

              <Divider
                mb="md"
                style={{ borderColor: 'rgba(65, 90, 119, 0.2)' }}
              />

              {/* Scores */}
              <Stack gap="sm" mb="md">
                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" fw={600} style={{ color: '#778da9' }}>
                      Overall Score
                    </Text>
                    <Text
                      size="xl"
                      fw={700}
                      style={{ color: categoryColor }}
                    >
                      {candidate.overallScore}
                    </Text>
                  </Group>
                </Box>

                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" style={{ color: '#778da9' }}>
                      Crisis Management
                    </Text>
                    <Text size="sm" fw={600} style={{ color: '#0d1b2a' }}>
                      {candidate.crisisManagement}%
                    </Text>
                  </Group>
                  <Box
                    style={{
                      height: 6,
                      background: '#ddd',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        height: '100%',
                        width: `${candidate.crisisManagement}%`,
                        background: '#778da9',
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" style={{ color: '#778da9' }}>
                      Sustainability
                    </Text>
                    <Text size="sm" fw={600} style={{ color: '#0d1b2a' }}>
                      {candidate.sustainability}%
                    </Text>
                  </Group>
                  <Box
                    style={{
                      height: 6,
                      background: '#ddd',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        height: '100%',
                        width: `${candidate.sustainability}%`,
                        background: '#1b263b',
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Group justify="space-between" mb={4}>
                    <Text size="xs" style={{ color: '#778da9' }}>
                      Team Motivation
                    </Text>
                    <Text size="sm" fw={600} style={{ color: '#0d1b2a' }}>
                      {candidate.teamMotivation}%
                    </Text>
                  </Group>
                  <Box
                    style={{
                      height: 6,
                      background: '#ddd',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        height: '100%',
                        width: `${candidate.teamMotivation}%`,
                        background: '#415a77',
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                </Box>
              </Stack>

              <Divider
                mb="md"
                style={{ borderColor: 'rgba(65, 90, 119, 0.2)' }}
              />

              {/* Skills */}
              <Box mb="md">
                <Group gap={4} mb={6}>
                  <Text
                    size="xs"
                    fw={700}
                    style={{
                      color: '#778da9',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Skills
                  </Text>
                </Group>
                <Group gap="xs">
                  {candidate.skills.slice(0, 4).map((skill, idx) => (
                    <Badge
                      key={idx}
                      size="sm"
                      radius="md"
                      variant="light"
                      style={{
                        background: 'rgba(65, 90, 119, 0.15)',
                        color: '#0d1b2a',
                        border: '1px solid rgba(65, 90, 119, 0.3)',
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 4 && (
                    <Badge
                      size="sm"
                      radius="md"
                      variant="light"
                      style={{
                        background: 'rgba(65, 90, 119, 0.15)',
                        color: '#415a77',
                        border: '1px solid rgba(65, 90, 119, 0.3)',
                      }}
                    >
                      +{candidate.skills.length - 4}
                    </Badge>
                  )}
                </Group>
              </Box>

              {/* Certifications */}
              {candidate.certifications && candidate.certifications.length > 0 && (
                <Box mb="md">
                  <Group gap={4} mb={6}>
                    <IconCertificate size={14} color="#778da9" />
                    <Text
                      size="xs"
                      fw={700}
                      style={{
                        color: '#778da9',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Certifications
                    </Text>
                  </Group>
                  <Group gap="xs">
                    {candidate.certifications.slice(0, 2).map((cert, idx) => (
                      <Badge
                        key={idx}
                        size="sm"
                        radius="md"
                        variant="light"
                        style={{
                          background: 'rgba(119, 141, 169, 0.15)',
                          color: '#0d1b2a',
                          border: '1px solid rgba(119, 141, 169, 0.3)',
                        }}
                      >
                        {cert}
                      </Badge>
                    ))}
                    {candidate.certifications.length > 2 && (
                      <Badge
                        size="sm"
                        radius="md"
                        variant="light"
                        style={{
                          background: 'rgba(119, 141, 169, 0.15)',
                          color: '#415a77',
                          border: '1px solid rgba(119, 141, 169, 0.3)',
                        }}
                      >
                        +{candidate.certifications.length - 2}
                      </Badge>
                    )}
                  </Group>
                </Box>
              )}

              {/* Action Button */}
              <Button
                fullWidth
                leftSection={<IconShare size={18} />}
                variant="light"
                size="md"
                styles={{
                  root: {
                    background: `${categoryColor}22`,
                    color: categoryColor,
                    border: `1px solid ${categoryColor}44`,
                    fontWeight: 600,
                  },
                }}
              >
                Share Candidate
              </Button>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
