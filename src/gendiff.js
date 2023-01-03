import { program } from 'commander';
import gendiff from './engine.js';

program
  .name('gendiff')
  .helpOption('-h, --help', 'output usage information')
  .version('output the version nmber')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => console.log(gendiff(path1, path2, program.opts().format)));

program.parse(process.argv);
