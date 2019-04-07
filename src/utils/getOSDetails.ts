import os from 'os';

import { PLATFORMS, ARCHITECTURES } from '../constants';

const getMatchedName = <T>(key: string, list: T) => {
  const listItemMatched = Object.keys(list).find(listItem =>
    key.includes(list[listItem].key),
  );

  if (!listItemMatched) {
    throw new ReferenceError(key);
  }

  return list[listItemMatched].name;
};

export const getPlatform = () => getMatchedName(os.platform(), PLATFORMS);

export const getArchitecture = () => getMatchedName(os.arch(), ARCHITECTURES);

export const isWindows = os.platform() === 'win32';
