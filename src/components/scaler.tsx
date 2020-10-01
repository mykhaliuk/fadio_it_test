import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  StackProps,
  useNumberInput,
} from '@chakra-ui/core';
import React, { FC, useEffect } from 'react';

type Props = {
  children?: never;
  onChange: (value: number) => void;
};

export type ScaleProps = Omit<StackProps, keyof Props> & Props;

export const Scaler: FC<ScaleProps> = ({ onChange, ...props }) => {
  const {
    getInputProps,
    value,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 0.05,
    defaultValue: 0.5,
    min: 0.01,
    max: 0.8,
    precision: 2,
  });

  useEffect(() => {
    onChange(parseFloat(value as string));
  }, [value, onChange]);

  const { ...inc } = getIncrementButtonProps();
  const { ...dec } = getDecrementButtonProps();
  const { ...input } = getInputProps({ isReadOnly: true });

  return (
    <HStack maxW="250px" {...props}>
      <Button {...inc}>+</Button>
      <InputGroup>
        <InputLeftAddon children="Scale: " />
        <Input {...input} />
      </InputGroup>
      <Button {...dec}>-</Button>
    </HStack>
  );
};

Scaler.defaultProps = {
  position: 'absolute',
  top: '5%',
  right: '9%',
};
