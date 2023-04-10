import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
export default function Selected() {
  const [value, setValue] = useState('rated');
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'Star', value: 'rated' },
        { label: 'Review', value: 'review' },
      ]}
    />
  );

}