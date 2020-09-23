/* eslint-disable no-param-reassign */

const transformer = (fileInfo, { jscodeshift: j }, options) => {
  const { source } = fileInfo;
  const collection = j(source);
  const { checksums } = options;

  collection
    .find(j.VariableDeclarator)
    .filter(
      (path) =>
        path.node.id.name === 'CHECKSUMS' &&
        path.node.init.type === 'ObjectExpression',
    )
    .find(j.ObjectProperty)
    .forEach((path) => {
      if (
        (path.node.key.type === 'Identifier' ||
          path.node.key.type === 'StringLiteral') &&
        path.node.value.type === 'LogicalExpression'
      ) {
        const checksumValue =
          checksums[path.node.key.name || path.node.key.value];

        if (checksumValue) {
          path.node.value.right.value = checksumValue;
        }
      }
    });

  return collection.toSource(options.printOptions || { quote: 'single' });
};

module.exports = transformer;
