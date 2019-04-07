import isObject from './isObject';

export const replacePlaceholdersInTargetValue = (value: any) => {
  const replacePlaceholders = (placeholders: DynamicObject) => {
    if (!isObject(placeholders)) {
      return value;
    }

    return Object.keys(placeholders).reduce(
      (accum, placeholder) =>
        accum.replace(
          new RegExp(`{${placeholder}}`, 'g'),
          placeholders[placeholder],
        ),
      value,
    );
  };

  replacePlaceholders.toString = () => value;

  return replacePlaceholders;
};

const createDeepProxy: <T extends object>(obj: T) => T = obj =>
  new Proxy(obj, {
    get(target, prop) {
      const value = target[prop] || prop;

      if (isObject(value)) {
        return createDeepProxy(value);
      }

      return replacePlaceholdersInTargetValue(value);
    },
  });

export default createDeepProxy;
