import { program } from 'commander';
import genDiff from './diff.js';

program
  .name('gendiff')
  .helpOption('-h, --help', 'output usage information')
  .version('output the version nmber')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2) => console.log(genDiff(path1, path2)))
  .option('-f, --format <type>', 'output format');

program.parse(process.argv);
