import { isWindows } from './getOSDetails';

export const wrapTextIfNotWindows = (wrapper: string) => (text: string) =>
  isWindows() ? text : `${wrapper}${text}${wrapper}`;

export default wrapTextIfNotWindows;
