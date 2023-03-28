import { Slider, 
         Switch,
         Group,
         useMantineTheme,
         Grid,
         TextInput
        } from '@mantine/core';
import { IconSun, IconMoonStars, IconAdjustmentsHorizontal, IconCursorText } from '@tabler/icons-react';
import { useState } from 'react';

// Configure marks to match step
const MARKS = [
  { value: 0, label: '$' },
  { value: 33, label: '$$' },
  { value: 66, label: '$$$' },
  { value: 99, label: '$$$$' },
];

export default function PriceSlider(props : any) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);

  const [valueMin, setValueMin] = useState('');
  const [valueMax, setValueMax] = useState('');

  const HandleChecked = (e : any) => {
    setChecked(e);
    setValueMin('');
    setValueMax('');
  }

  return (
    <>
      {
      <Grid grow gutter="sm">
        Select Price Point
      <Grid.Col span={8}>
      {checked ?       
      <>
      <Grid>
        <Grid.Col span={5}>
        <TextInput
          placeholder="Min $"
          label="Min Price"
          value={valueMin} 
          onChange={(event) => setValueMin(event.currentTarget.value)}
          withAsterisk

        />
        </Grid.Col>
        <Grid.Col span={5}>
        <TextInput
          placeholder="Max $"
          label="Max Price"
          value={valueMax} 
          onChange={(event) => setValueMax(event.currentTarget.value)}
          withAsterisk

        />
        </Grid.Col>
      </Grid>
      </>
      : 
      <Slider
      label={(val) => MARKS.find((mark) => mark.value === val)?.label}
      defaultValue={50}
      step={33}
      marks={MARKS}
      color="red"
      styles={{ 
        markLabel: { 
          color: "red"
        }
      }}
    /> 

      }

      </Grid.Col>
      <Grid.Col span="auto">
      <Switch
        checked={checked}
        onChange={(event) => HandleChecked(event.currentTarget.checked)}
        size="sm"
        color={'red'}
        onLabel={<IconCursorText size="16" stroke={2.5} color={'white'} />}
        offLabel={<IconAdjustmentsHorizontal size="16" stroke={2.5} color={theme.colors.red[6]} />}
      />
      </Grid.Col>
      </Grid> 

      }

    </>
  );
}