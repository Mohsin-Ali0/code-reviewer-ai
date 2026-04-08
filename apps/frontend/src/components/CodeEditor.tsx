'use client';

import { useState, useCallback } from 'react';
import { Box, Paper, Select, MenuItem, Button, Stack, FormControl, InputLabel } from '@mui/material';
import { Upload, Delete, Send, AutoAwesome } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/hooks/useTheme';
let Loading = true;
const MotionButton = motion(Button);

const LANGUAGES = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
];

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CodeEditor({
  code,
  language,
  onCodeChange,
  onLanguageChange,
  onSubmit,
  isLoading,
}: CodeEditorProps) {
  const { mode } = useTheme();
  const [charCount, setCharCount] = useState(code.length);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onCodeChange(content);
          setCharCount(content.length);

          // Auto-detect language
          const ext = file.name.split('.').pop()?.toLowerCase();
          const langMap: Record<string, string> = {
            ts: 'typescript',
            tsx: 'typescript',
            js: 'javascript',
            jsx: 'javascript',
            py: 'python',
            java: 'java',
            go: 'go',
            rs: 'rust',
            sql: 'sql',
            cpp: 'cpp',
            c: 'cpp',
            html: 'html',
            css: 'css',
            json: 'json',
          };
          if (ext && langMap[ext]) {
            onLanguageChange(langMap[ext]);
          }
        };
        reader.readAsText(file);
      }
    },
    [onCodeChange, onLanguageChange],
  );

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    onCodeChange(newCode);
    setCharCount(newCode.length);
  };

  const handleClear = () => {
    onCodeChange('');
    setCharCount(0);
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
          p: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
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
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: mode === 'dark' ? 'rgba(0, 188, 212, 0.4)' : 'rgba(25, 118, 210, 0.2)',
            boxShadow:
              mode === 'dark'
                ? '0 12px 48px rgba(0, 188, 212, 0.15)'
                : '0 12px 48px rgba(25, 118, 210, 0.1)',
          },
        }}
      >
        {/* Toolbar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}
          spacing={2}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ minWidth: 150 }}
          >
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select value={language} label="Language" onChange={(e) => onLanguageChange(e.target.value)}>
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </motion.div>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <input
              type="file"
              accept=".ts,.tsx,.js,.jsx,.py,.java,.go,.rs,.sql,.cpp,.c,.html,.css,.json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button component="span" startIcon={<Upload />} variant="outlined" size="small">
                  Upload
                </Button>
              </motion.div>
            </label>

            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Button
                // endIcon={charCount}
                variant="text"
                size="small"
                disabled
                sx={{ color: 'text.secondary' }}
              >
                {charCount} chars
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleClear}
                startIcon={<Delete />}
                variant="outlined"
                color="warning"
                disabled={code.length === 0}
                size="small"
              >
                Clear
              </Button>
            </motion.div>
          </Box>
        </Stack>

        {/* Monaco Editor */}
        <motion.div
          whileHover={{ borderColor: 'rgba(0, 188, 212, 0.5)' }}
          style={{
            flex: 1,
            border: '2px solid',
            borderColor: mode === 'dark' ? 'rgba(0, 188, 212, 0.2)' : 'rgba(25, 118, 210, 0.1)',
            borderRadius: 6,
            overflow: 'hidden',
            minHeight: '400px',
            background: mode === 'dark' ? '#0f1419' : '#fafafa',
            transition: 'all 0.3s ease',
          }}
        >
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={handleCodeChange}
            theme={mode === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              fontFamily: 'Fira Code, Consolas, monospace',
              fontSize: 16,
              lineNumbers: 'on',
              folding: true,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: false,
              },
            }}
          />
        </motion.div>

        {/* Submit Button */}
        <MotionButton
          onClick={onSubmit}
          startIcon={isLoading ? undefined : <AutoAwesome />}
          variant="contained"
          size="large"
          fullWidth
          disabled={code.length < 10 || isLoading}
          whileHover={code.length >= 10 && !isLoading ? { scale: 1.02 } : {}}
          whileTap={code.length >= 10 && !isLoading ? { scale: 0.98 } : {}}
          sx={{
            background:
              code.length < 10 || isLoading
                ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.5) 0%, rgba(0, 188, 212, 0.5) 100%)'
                : 'linear-gradient(135deg, #1976D2 0%, #00BCD4 100%)',
            fontWeight: 700,
            letterSpacing: '0.5px',
            py: 1.5,
            fontSize: '1.05rem',
            textTransform: 'none',
            boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)',
            '&:hover:not(:disabled)': {
              boxShadow: '0 8px 25px rgba(0, 188, 212, 0.5)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {isLoading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                {'⏳'}
              </motion.div>
              Analyzing...
            </>
          ) : (
            'Analyze Code'
          )}
        </MotionButton>
      </Paper>
    </motion.div>
  );
}
