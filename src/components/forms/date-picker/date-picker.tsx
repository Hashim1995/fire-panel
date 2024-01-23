import { Input } from '@chakra-ui/react';
import React from 'react';
import Style from './date-picker.module.scss';

function DatePicker(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Input className={Style.customDate} {...props} />
    </div>
  );
}

export default DatePicker;
