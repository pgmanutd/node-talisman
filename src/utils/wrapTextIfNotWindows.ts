import { isWindows } from './getOSDetails';

const wrapTextIfNotWindows = (wrapper: string) => (text: string) =>
  isWindows() ? text : `${wrapper}${text}${wrapper}`;

export default wrapTextIfNotWindows;
