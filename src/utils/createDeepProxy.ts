import isObject from './isObject';

const replacePlaceholdersInTargetValue = (value: any) => {
  const replacePlaceholders = (placeholders: DynamicObject) => {
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

const createDeepProxy: <T extends DynamicObject>(
  obj: T,
) => DeepStringOrFunction<T, typeof replacePlaceholdersInTargetValue> = obj =>
  new Proxy(obj, {
    get(target, prop: string) {
      const value = target[prop] || prop;

      if (isObject(value)) {
        return createDeepProxy(value);
      }

      return replacePlaceholdersInTargetValue(value);
    },
  });

export default createDeepProxy;
