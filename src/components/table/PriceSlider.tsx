import { Slider } from '@mantine/core';

// Configure marks to match step
const MARKS = [
  { value: 0, label: '$' },
  { value: 33, label: '$$' },
  { value: 66, label: '$$$' },
  { value: 99, label: '$$$$' },
];

export default function PriceSlider(props : any) {
  return (
    <>
      {/* Set min, max and step props to replace default values */}
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
    </>
  );
}