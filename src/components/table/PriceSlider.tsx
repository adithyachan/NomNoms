import { Slider, 
         Switch,
         useMantineTheme,
         Grid,
         NumberInput
        } from '@mantine/core';
import { Marks } from '@mantine/core/lib/Slider/Marks/Marks';
import { IconAdjustmentsHorizontal, IconCursorText } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

// Configure marks to match step
const MARKS = [
  { value: 0, label: '$' },
  { value: 33, label: '$$' },
  { value: 66, label: '$$$' },
  { value: 99, label: '$$$$' },
];

export default function PriceSlider(props : { setPrice : any, reset : any, setReset : any, rand : any, setRand : any} ) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(false);
  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(0);
  const [sliderVal, setSliderVal] = useState(99);

  useEffect(() => {
    if (props.rand) {
      console.log("hello")
      if (!checked) {
        const max = 3;
        const min= 0
        const res = Math.floor(Math.random()*(max - min) + min)
        setSliderVal(MARKS[res].value)
      } else {
        const max = 200;
        const min = 0
        let minPrice = Math.floor(Math.random()*(max - min) + min)
        let maxPrice = Math.floor(Math.random()*(max - min) + min)
        if (maxPrice < minPrice) {
          let temp = minPrice
          minPrice = maxPrice
          maxPrice = temp;
        }
        minPrice = Math.trunc((minPrice / 10)) * 10;
        maxPrice = Math.trunc((maxPrice / 10)) * 10;
        setValueMin(minPrice)
        setValueMax(maxPrice)
      }
      props.setRand(false)
    }
    if (props.reset) {
      if (!checked) {
        setSliderVal(99)
      } else {
        setValueMin(0)
        setValueMax(0)
      }
      props.setReset(false)
    }
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
  }, [sliderVal, valueMin, valueMax, props.reset, props.rand]);


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