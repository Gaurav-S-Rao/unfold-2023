import React, { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Input, { InputProps, inputClasses } from '@mui/material/Input';
import { Box, Card } from '@mui/material';

const STEP = 50;
const MIN_AMOUNT = 0;
const MAX_AMOUNT = 1000;

interface InputAmountProps extends InputProps {
  autoWidth: number;
  amount: number | number[];
}

function InputAmount({ autoWidth, amount, onBlur, onChange, sx, ...other }: InputAmountProps) {
  return (
    <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>
      <Typography variant="h5">SUI</Typography>
      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{
          step: STEP,
          min: MIN_AMOUNT,
          max: MAX_AMOUNT,
          type: 'number',
        }}
        sx={{
          [`& .${inputClasses.input}`]: {
            p: 0,
            typography: 'h3',
            textAlign: 'center',
            width: autoWidth,
          },
        }}
        {...other}
      />
    </Stack>
  );
}

export default function TopUpCard() {
  const [autoWidth, setAutoWidth] = useState(104);
  const [amount, setAmount] = useState(0);

  const handleAutoWidth = useCallback(() => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 34 + 100);
  }, [amount]);

  const handleChangeSlider = useCallback((event: Event, newValue: number | number[]) => {
    setAmount(newValue as number);
  }, []);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  }, []);

  const handleBlur = useCallback(() => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  }, [amount]);

  return (
    <Card sx={{ width: '600px', height: '350px' }}>
      <Stack spacing={3} m={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          insert amount
        </Typography>
        <InputAmount
          amount={amount}
          onBlur={handleBlur}
          autoWidth={autoWidth}
          onChange={handleChangeInput}
        />
        <Slider
          value={typeof amount === 'number' ? amount : 0}
          valueLabelDisplay="auto"
          step={STEP}
          marks
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          onChange={handleChangeSlider}
        />
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle1' }}>
          <Box component="span" sx={{ flexGrow: 1 }}>
            Your Balance
          </Box>
          fetch from wallet
        </Stack>
        <Button size="large" color="inherit" variant="contained" disabled={amount === 0}>
          Top Up Now
        </Button>
      </Stack>
    </Card>
  );
}
