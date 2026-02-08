import { Paper, Text, Group, Box, Badge } from '@mantine/core';

export default function StatsCard({ title, value, icon, color, subtitle }) {
  return (
    <Paper
      p="lg"
      radius="md"
      style={{
        backgroundColor: color,
        color: '#e0e1dd',
        border: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top row */}
      <Group justify="space-between" mb="sm">
        <Box style={{ color: '#e0e1dd' }}>{icon}</Box>

        {subtitle && (
          <Badge
            variant="light"
            style={{
              background: '#e0e1dd22',
              color: '#e0e1dd',
              border: '1px solid #e0e1dd44',
            }}
          >
            {subtitle}
          </Badge>
        )}
      </Group>

      {/* Title */}
      <Text
        size="xs"
        style={{
          opacity: 0.85,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </Text>

      {/* Value */}
      <Text
        size="2rem"
        style={{
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {value}
      </Text>
    </Paper>
  );
}
