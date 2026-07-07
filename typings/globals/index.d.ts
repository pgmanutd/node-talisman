interface DynamicObject {
  [key: string]: any;
}

type DeepStringOrFunction<T, U extends (...args: any) => any> = {
  [P in keyof T]: T[P] extends string
    ? ReturnType<U>
    : DeepStringOrFunction<T[P], U>;
};
