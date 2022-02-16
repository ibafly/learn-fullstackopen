const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union type member ${JSON.stringify(value)}`
  );
};

export { assertNever };
