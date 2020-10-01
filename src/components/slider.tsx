import {
  Flex,
  FlexProps,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider as Sl,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core';
import React, { useEffect } from 'react';

type Props = {
  children?: never;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  initialValue?: number;
};

export type SliderProps = Omit<FlexProps, keyof Props> & Props;

const Slider: React.FC<SliderProps> = ({
  onChange,
  min,
  max,
  initialValue,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue ?? 0);
  const handleChange = value => setValue(value);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <Flex p={4} maxW="60vw">
      <NumberInput
        size="sm"
        maxW="100px"
        mr="2rem"
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {/*//@ts-ignore*/}
      <Sl
        flex="1"
        size="sm"
        value={value}
        max={max}
        min={min}
        onChange={handleChange}
        {...props}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="24px">
          {value}
        </SliderThumb>
      </Sl>
    </Flex>
  );
};

export default Slider;
