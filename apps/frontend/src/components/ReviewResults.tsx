'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Security,
  Speed,
  Build,
  Lightbulb,
  Grade,
  Download,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ReviewResult } from '@code-reviewer/types';
import { useTheme } from '@/hooks/useTheme';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      style={{
        width: '100%',
        display: value === index ? 'block' : 'none',
      }}
      {...other}
    >
      {value === index && (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          sx={{ p: 3 }}
        >
          {children}
        </MotionBox>
      )}
    </div>
  );
}

interface ReviewResultsProps {
  result: ReviewResult;
  onExport: (format: 'json' | 'pdf') => void;
  isExporting: boolean;
}

export function ReviewResults({ result, onExport, isExporting }: ReviewResultsProps) {
  const { mode } = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const getSeverityColor = (severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    const colors: Record<string, string> = {
      CRITICAL: '#F44336',
      HIGH: '#FF9800',
      MEDIUM: '#FF9800',
      LOW: '#2196F3',
    };
    return colors[severity] || '#2196F3';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(25, 35, 60, 0.5) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(0, 188, 212, 0.2)' : 'rgba(25, 118, 210, 0.1)',
          boxShadow:
            mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.05)',
        }}
      >
      {/* Export Buttons */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-end',
          flexShrink: 0,
          background:
            mode === 'dark'
              ? 'rgba(0, 188, 212, 0.05)'
              : 'rgba(25, 118, 210, 0.05)',
        }}
      >
        <MotionButton
          startIcon={<Download />}
          onClick={() => onExport('json')}
          disabled={isExporting}
          variant="contained"
          size="small"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            background: 'linear-gradient(135deg, #1976D2 0%, #00BCD4 100%)',
            fontWeight: 600,
          }}
        >
          JSON
        </MotionButton>
        <MotionButton
          startIcon={<Download />}
          onClick={() => onExport('pdf')}
          disabled={isExporting}
          variant="outlined"
          size="small"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{ fontWeight: 600 }}
        >
          PDF
        </MotionButton>
      </Box>

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: '2px solid',
          borderColor: 'divider',
          background:
            mode === 'dark'
              ? 'rgba(0, 0, 0, 0.2)'
              : 'rgba(0, 0, 0, 0.02)',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(_, value) => setTabIndex(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#00BCD4',
              },
            },
            '& .Mui-selected': {
              color: '#00BCD4 !important',
            },
          }}
        >
          <Tab icon={<Security />} iconPosition="start" label="Security" />
          <Tab icon={<Speed />} iconPosition="start" label="Performance" />
          <Tab icon={<Build />} iconPosition="start" label="Maintainability" />
          <Tab icon={<Lightbulb />} iconPosition="start" label="Improvements" />
          <Tab icon={<Grade />} iconPosition="start" label="Praise" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'dark'
              ? 'rgba(0, 188, 212, 0.3)'
              : 'rgba(25, 118, 210, 0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: mode === 'dark'
                ? 'rgba(0, 188, 212, 0.5)'
                : 'rgba(25, 118, 210, 0.4)',
            },
          },
        }}
      >
        {/* Security Tab */}
        <TabPanel value={tabIndex} index={0}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible">
            <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
              <Chip
                label={`Overall Security: ${result.security.level}`}
                variant="filled"
                sx={{
                  bgcolor:
                    result.security.level === 'CRITICAL'
                      ? '#F44336'
                      : result.security.level === 'HIGH'
                        ? '#FF9800'
                        : result.security.level === 'MEDIUM'
                          ? '#FFC107'
                          : '#4CAF50',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  py: 3,
                  px: 2,
                }}
              />
            </MotionBox>
            <Stack spacing={2}>
              {result.security.findings.map((finding, idx) => (
                <MotionCard
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  sx={{
                    borderLeft: `5px solid ${getSeverityColor(finding.severity)}`,
                    background:
                      mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                      <Chip
                        label={finding.severity}
                        sx={{
                          bgcolor: getSeverityColor(finding.severity),
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                        }}
                      />
                      <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {finding.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: '1rem', mb: 1.5 }}>
                      {finding.description}
                    </Typography>
                    {finding.suggestion && (
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor:
                            mode === 'dark'
                              ? 'rgba(0, 188, 212, 0.1)'
                              : 'rgba(25, 118, 210, 0.05)',
                          borderRadius: 1,
                          borderLeft: '3px solid #00BCD4',
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, color: '#00BCD4', mb: 0.5, fontSize: '0.95rem' }}>
                          💡 Fix:
                        </Typography>
                        <Typography sx={{ fontSize: '1rem' }}>{finding.suggestion}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </MotionCard>
              ))}
              {result.security.findings.length === 0 && (
                <Typography sx={{ color: 'success.main', fontWeight: 700, fontSize: '1.1rem' }}>
                  ✅ No security issues detected!
                </Typography>
              )}
            </Stack>
          </MotionBox>
        </TabPanel>

        {/* Performance Tab */}
        <TabPanel value={tabIndex} index={1}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible">
            <Stack spacing={2.5}>
              {result.performance.suggestions.map((sugg, idx) => (
                <MotionCard
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  sx={{
                    borderLeft: `5px solid ${
                      sugg.impact === 'HIGH'
                        ? '#F44336'
                        : sugg.impact === 'MEDIUM'
                          ? '#FF9800'
                          : '#2196F3'
                    }`,
                    background:
                      mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                      <Chip
                        label={`Impact: ${sugg.impact}`}
                        sx={{
                          bgcolor:
                            sugg.impact === 'HIGH'
                              ? '#F44336'
                              : sugg.impact === 'MEDIUM'
                                ? '#FF9800'
                                : '#2196F3',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                        }}
                      />
                      <Typography variant="h5" sx={{ fontSize: '1.3rem', fontWeight: 700 }}>
                        {sugg.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '1rem', mb: 1.5 }}>{sugg.description}</Typography>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor:
                          mode === 'dark'
                            ? 'rgba(0, 188, 212, 0.1)'
                            : 'rgba(25, 118, 210, 0.05)',
                        borderRadius: 1,
                        borderLeft: '3px solid #00BCD4',
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#00BCD4', mb: 0.5, fontSize: '0.95rem' }}>
                        💡 Suggestion:
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>{sugg.suggestion}</Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
              {result.performance.suggestions.length === 0 && (
                <Typography sx={{ color: 'success.main', fontWeight: 700, fontSize: '1.1rem' }}>
                  ✅ No performance issues found!
                </Typography>
              )}
            </Stack>
          </MotionBox>
        </TabPanel>

        {/* Maintainability Tab */}
        <TabPanel value={tabIndex} index={2}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible">
            <MotionBox variants={itemVariants} sx={{ mb: 3 }}>
              <MotionCard
                whileHover={{ y: -4 }}
                sx={{
                  background:
                    mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 2 }}>
                    Cognitive Complexity Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MotionBox
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, #4CAF50 0deg ${
                          (result.maintainability.cognitiveComplexity / 100) * 360
                        }deg, rgba(255, 255, 255, 0.1) ${
                          (result.maintainability.cognitiveComplexity / 100) * 360
                        }deg)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 105,
                          height: 105,
                          borderRadius: '50%',
                          background: mode === 'dark' ? '#0a0e27' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '2rem' }}>
                          {result.maintainability.cognitiveComplexity}
                        </Typography>
                        <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                          / 100
                        </Typography>
                      </Box>
                    </MotionBox>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '1rem', mb: 1 }}>
                        {result.maintainability.cognitiveComplexity < 30
                          ? '✅ Good maintainability - Code is well-structured'
                          : result.maintainability.cognitiveComplexity < 60
                            ? '⚠️ Moderate complexity - Consider refactoring'
                            : '🔴 High complexity - Refactoring recommended'}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(result.maintainability.cognitiveComplexity, 100)}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          background:
                            mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(90deg, ${
                              result.maintainability.cognitiveComplexity < 30
                                ? '#4CAF50'
                                : result.maintainability.cognitiveComplexity < 60
                                  ? '#FF9800'
                                  : '#F44336'
                            } 0%, ${
                              result.maintainability.cognitiveComplexity < 30
                                ? '#45a049'
                                : result.maintainability.cognitiveComplexity < 60
                                  ? '#f57c00'
                                  : '#d32f2f'
                            } 100%)`,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </MotionBox>

            <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, mb: 2 }}>
              Issues Found:
            </Typography>
            <Stack spacing={2}>
              {result.maintainability.issues.map((issue, idx) => (
                <MotionCard
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  sx={{
                    background:
                      mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                    <Typography variant="h5" sx={{ mb: 1, fontSize: '1.3rem', fontWeight: 700 }}>
                      {issue.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', mb: 1.5 }}>{issue.description}</Typography>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor:
                          mode === 'dark'
                            ? 'rgba(0, 188, 212, 0.1)'
                            : 'rgba(25, 118, 210, 0.05)',
                        borderRadius: 1,
                        borderLeft: '3px solid #00BCD4',
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, color: '#00BCD4', mb: 0.5, fontSize: '0.95rem' }}>
                        💡 Improvement:
                      </Typography>
                      <Typography sx={{ fontSize: '1rem' }}>{issue.suggestion}</Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
            </Stack>
          </MotionBox>
        </TabPanel>

        {/* Improvements Tab */}
        <TabPanel value={tabIndex} index={3}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible">
            <Stack spacing={2.5}>
              {result.improvements.map((imp, idx) => (
                <MotionCard
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  sx={{
                    background:
                      mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <CardContent sx={{ '&:last-child': { pb: 2 } }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 1 }}>
                      {imp.title}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', mb: 2, color: 'text.secondary' }}>
                      {imp.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{ fontWeight: 600, mb: 1, display: 'block', fontSize: '0.95rem', color: '#F44336' }}>
                        Current Code:
                      </Typography>
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: '#FFEBEE',
                          borderRadius: 1,
                          fontFamily: 'Fira Code, monospace',
                          fontSize: '0.95rem',
                          overflow: 'auto',
                          color: '#C62828',
                          border: '1px solid rgba(244, 67, 54, 0.2)',
                        }}
                      >
                        <code>{imp.originalCode}</code>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{ fontWeight: 600, mb: 1, display: 'block', fontSize: '0.95rem', color: '#2E7D32' }}>
                        Suggested Code:
                      </Typography>
                      <Box
                        sx={{
                          p: 1.5,
                          bgcolor: '#E8F5E9',
                          borderRadius: 1,
                          fontFamily: 'Fira Code, monospace',
                          fontSize: '0.95rem',
                          overflow: 'auto',
                          color: '#1B5E20',
                          border: '1px solid rgba(76, 175, 80, 0.2)',
                        }}
                      >
                        <code>{imp.suggestedCode}</code>
                      </Box>
                    </Box>

                    <Typography sx={{ fontSize: '1rem' }}>
                      <strong>Why:</strong> {imp.reason}
                    </Typography>
                  </CardContent>
                </MotionCard>
              ))}
              {result.improvements.length === 0 && (
                <Typography sx={{ color: 'success.main', fontWeight: 700, fontSize: '1.1rem' }}>
                  ✅ Code looks good, no major improvements suggested!
                </Typography>
              )}
            </Stack>
          </MotionBox>
        </TabPanel>

        {/* Praise Tab */}
        <TabPanel value={tabIndex} index={4}>
          <MotionBox variants={containerVariants} initial="hidden" animate="visible">
            <Stack spacing={2.5}>
              {result.praiseNotes.map((note, idx) => (
                <MotionCard
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  sx={{
                    borderLeft: '5px solid #4CAF50',
                    background:
                      mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: '1.8rem', flexShrink: 0 }}>✨</Typography>
                      <Typography sx={{ fontSize: '1.05rem', fontWeight: 500 }}>
                        {note}
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              ))}
              {result.praiseNotes.length === 0 && (
                <Typography sx={{ color: 'text.secondary', fontSize: '1rem' }}>
                  Keep improving your code! 🚀
                </Typography>
              )}
            </Stack>
          </MotionBox>
        </TabPanel>
      </Box>
    </Paper>
    </motion.div>
  );
}
