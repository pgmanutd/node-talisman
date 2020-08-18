const getProcessArgs = (args: NodeJS.Process['argv']) =>
  args.slice(2).join(' ');

export default getProcessArgs;
