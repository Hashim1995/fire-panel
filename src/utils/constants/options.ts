/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
import { selectOption } from '@/models/common';
import { Language } from '@/models/enum';

export type selectOptionPopular = {
  readonly value: boolean;
  readonly label: string;
};

function LANG_ENUM_OPTIONS() {
  const languageOptions = [];

  for (const key in Language) {
    if (isNaN(parseInt(key))) {
      languageOptions.push({
        label: key,
        value: Language[key].toString()
      });
    }
  }

  return languageOptions;
}

const languageOptions: selectOption[] = LANG_ENUM_OPTIONS();
const statusOptions: any[] = [
  {
    value: 2,
    label: 'Aktiv'
  },
  {
    value: 1,
    label: 'Deaktiv'
  }
];

const popularOption: selectOptionPopular[] = [
  {
    value: true,
    label: 'Aktiv'
  },
  {
    value: false,
    label: 'Deaktiv'
  }
];

const isBlockedOptions: selectOption[] = [
  {
    value: '1',
    label: 'Bloklanmış'
  },
  {
    value: '2',
    label: 'Bloklanmamış'
  }
];

const roleOptions: selectOption[] = [
  {
    value: 1,
    label: 'Admin'
  },
  {
    value: 2,
    label: 'Operator'
  },
  {
    value: 3,
    label: 'Copywriter'
  },

];

const genderOptions: selectOption[] = [
  {
    value: '1',
    label: 'Kişi'
  },
  {
    value: '2',
    label: 'Qadın'
  }
];

export {
  languageOptions,
  genderOptions,
  roleOptions,
  isBlockedOptions,
  statusOptions,
  popularOption
};
