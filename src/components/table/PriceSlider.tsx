import { Slider } from '@mantine/core';

// Configure marks to match step
const MARKS = [
  { value: 25, label: '$' },
  { value: 50, label: '$$' },
  { value: 75, label: '$$$' },
  { value: 100, label: '$$$$' },
];

export default function PriceSlider(props : any) {
  return (
    <>
      {/* Set min, max and step props to replace default values */}
      <Slider
        defaultValue={50}
        step={25}
        marks={MARKS}
        styles={{ markLabel: { display: 'none' } }}
      />
    </>
  );
}