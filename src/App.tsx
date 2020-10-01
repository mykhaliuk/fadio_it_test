import { Flex, useColorMode, useColorModeValue } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import Slider from './components/slider';
import { Timeline } from './components/timeline';
import { normalizeData, NormalizedTrial } from './utils/normalize-data';

const defaultTrials = [
  { start: 5, end: 50, title: 'Study of Bendamustine' },
  { start: 55, end: 72, title: 'ASCT With Nivolumab' },
  { start: 70, end: 89, title: 'Study of Stockolm' },
  { start: 95, end: 115, title: 'Bortezomib' },
  { start: 110, end: 215, title: '34985u' },
];

function App() {
  const [trials, setTrials] = useState<NormalizedTrial[]>(
    normalizeData(defaultTrials),
  );
  const [end, setEnd] = useState<number>(50);
  const [start, setStart] = useState<number>(10);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver({ ref: wrapRef });

  const height = dimensions.height;
  const width = dimensions.width;

  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    setTrials(() =>
      normalizeData([...defaultTrials, { title: '---== yo ==---', start, end }]),
    );
  }, [start, end]);

  return (
    <>
      <Slider onChange={setEnd} min={5} initialValue={5} />
      <Slider onChange={setStart} initialValue={0} />

      <Flex
        w="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Flex
          w="80vw"
          h="45vh"
          alignItems="stretch"
          position="relative"
          onClick={toggleColorMode}
          ref={wrapRef}
          {...{ bg }}
        >
          {height && width && <Timeline data={trials} {...{ height, width }} />}
        </Flex>
        Size: {width}x{height}
      </Flex>
    </>
  );
}

export default App;
