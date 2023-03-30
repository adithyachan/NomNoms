import { Slider, 
         Switch,
         Group,
         useMantineTheme,
         Grid,
         TextInput, 
         NumberInput
        } from '@mantine/core';
import { IconSun, IconMoonStars, IconAdjustmentsHorizontal, IconCursorText } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

// Configure marks to match step
const MARKS = [
  { value: 0, label: '$' },
  { value: 33, label: '$$' },
  { value: 66, label: '$$$' },
  { value: 99, label: '$$$$' },
];

export default function PriceSlider(props : { setPrice : any } ) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(0);
  const [sliderVal, setSliderVal] = useState(99);

  useEffect(() => {
    console.log("checked: " + checked)
    if (!checked) {
      console.log("hello" + sliderVal)
      props.setPrice({
        minPrice: 0,
        maxPrice: sliderVal,
        checked: false,
        error: false
      })
      setValueMin(0);
      setValueMax(0);
    } else {
      console.log("USEEFFECT: " + valueMin + " " + valueMax)
      props.setPrice({
        minPrice: valueMin,
        maxPrice: valueMax,
        checked: true,
        error: false
      })
      setSliderVal(99)
    }
  }, [sliderVal, valueMin, valueMax]);


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
        <NumberInput
        label="Min Price"
        defaultValue={0}
        value={valueMin}
        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
        formatter={(value) =>
        !Number.isNaN(parseFloat(value!))
          ? `$ ${value}`.replace("/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g", ',')
          : '$ '
        }
        onChange={(valueMinimum) => {
          setValueMin(valueMinimum!)
        }}
        withAsterisk
        />
        </Grid.Col>
        <Grid.Col span={5}>
        <NumberInput
        label="Max Price"
        defaultValue={0}
        value={valueMax}
        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
        formatter={(value) =>
        !Number.isNaN(parseFloat(value!))
          ? `$ ${value}`.replace("/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g", ',')
          : '$ '
        }
        onChange={(valueMaximum) => {
          setValueMax(valueMaximum!)
        }}
        withAsterisk
        />
        </Grid.Col>
      </Grid>
      </>
      : 
      <Slider
      label={(val) => MARKS.find((mark) => mark.value === val)?.label}
      defaultValue={99}
      value={sliderVal}
      step={33}
      marks={MARKS}
      color="red"
      styles={{ 
        markLabel: { 
          color: "red"
        }
      }}
      onChange={setSliderVal}
    /> 
      }
      </Grid.Col>
      <Grid.Col span="auto">
      <Switch
        checked={checked}
        onChange={(event) => {
          setChecked(event.currentTarget.checked); 
          setValueMin(0);
          setValueMax(0);
          props.setPrice({
            minPrice: 0,
            maxPrice: 0,
            checked: !checked,
            error: false
          })
        }}
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