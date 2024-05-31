type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export default JSONValue;

// https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
