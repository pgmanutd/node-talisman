interface ImportMeta {
  url: string;
}

interface DynamicObject {
  [key: string]: any;
}

type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  Exclude<keyof T, keyof T1>
>;

type Flatten<T> = T extends Array<infer U> ? U : T;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
};

type valueof<T> = T[keyof T];

type DeepStringOrFunction<T, U extends (...args: any) => any> = {
  [P in keyof T]: T[P] extends String
    ? ReturnType<U>
    : DeepStringOrFunction<T[P], U>
};
