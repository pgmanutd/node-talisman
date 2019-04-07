import minimist from 'minimist';

const getProcessArgs = (args: NodeJS.Process['argv']) => {
  const parseArgs = minimist(args.slice(2));

  return Object.keys(parseArgs)
    .reduce((accum: string[], parseArg) => {
      if (parseArg === '_') {
        return [...accum, ...parseArgs[parseArg]];
      }

      return [...accum, `--${parseArg} "${parseArgs[parseArg]}"`];
    }, [])
    .join(' ');
};

export default getProcessArgs;
