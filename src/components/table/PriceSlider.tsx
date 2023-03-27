import { Slider, 
         Switch,
         Group,
         useMantineTheme,
         Grid
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

  console.log(checked);

  return (
    <>
      {
      <Grid grow gutter="sm">
        Select Price Point
      <Grid.Col span={8}>
      {checked ?       
      <></>
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
        onChange={(event) => setChecked(event.currentTarget.checked)}
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