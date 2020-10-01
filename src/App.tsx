import {
  Heading,
  Text,
  Flex,
  useColorMode,
  useColorModeValue,
  Box,
} from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { Timeline } from './components/timeline';
import { Trial } from './utils/normalize-data';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

declare global {
  interface Window {
    renderClinicalTrials: (data: Trial[]) => void;
  }
}

const defaultData: Trial[] = [
  { start: 5, end: 50, title: 'Study of Bendamustine' },
  { start: 55, end: 85, title: 'ASCT With Nivolumab' },
  { start: 70, end: 100, title: 'Study of Stockolm' },
  { start: 90, end: 115, title: 'Bortezomib' },
];

function App() {
  const [data, setData] = useState<Trial[]>(defaultData);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver({ ref: wrapRef });
  const codeStyle = useColorModeValue(docco, atomOneDark);
  const height = dimensions.height;
  const width = dimensions.width;

  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    function renderClinicalTrials(data: Trial[]) {
      setData(data);
    }

    window.renderClinicalTrials = renderClinicalTrials;
  });

  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading size="lg" my={12}>
        Hey d3.js
      </Heading>
      <Flex
        w="80vw"
        h="45vh"
        alignItems="stretch"
        position="relative"
        onClick={toggleColorMode}
        ref={wrapRef}
        {...{ bg }}
      >
        {height && width && <Timeline {...{ height, width, data }} />}
      </Flex>
      <Box w="80vw" mt={14}>
        <Text my={8}>
          This is an implementation of the{' '}
          <code>Product Engineering Technical Test</code>.
        </Text>
        <Text my={8}>
          By the <code>renderClinicalTrials</code> function exposed in Window object
          you can render any chart data that matches the following type:
        </Text>
        <SyntaxHighlighter language="typescript" style={codeStyle}>
          {`type Trials = { start: number, end: number, title: string }[]`}
        </SyntaxHighlighter>
        <Text my={8}>
          Also, in the <code>test</code> branch you can find the manual Trail to play
          around.
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
