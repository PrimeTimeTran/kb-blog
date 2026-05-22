import { Project, SyntaxKind } from 'ts-morph';
import fs from 'fs';
import path from 'path';

const project = new Project({
  skipAddingFilesFromTsConfig: true,
});

const DIR = path.resolve('./u-design-kit');

function addFiles(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      addFiles(full);
    } else if (file.endsWith('.tsx')) {
      project.addSourceFileAtPath(full);
    }
  }
}

addFiles(DIR);

for (const file of project.getSourceFiles()) {
  console.log('Processing:', file.getBaseName());

  // remove interfaces / types safely
  file.getInterfaces().forEach((i) => i.remove());
  file.getTypeAliases().forEach((t) => t.remove());

  // remove type-only imports
  file.getImportDeclarations().forEach((imp) => {
    if (imp.isTypeOnly()) imp.remove();
  });

  // remove parameter types (SAFE way)
  file.getFunctions().forEach((fn) => {
    fn.getParameters().forEach((p) => {
      const name = p.getName();
      const initializer = p.getInitializer()?.getText();

      // rebuild parameter WITHOUT type
      p.replaceWithText(initializer ? `${name} = ${initializer}` : name);
    });
  });

  // rename file
  const oldPath = file.getFilePath();
  const newPath = oldPath.replace(/\.tsx$/, '.jsx');

  file.saveSync();
  fs.renameSync(oldPath, newPath);
}
const sourceFiles = project.getSourceFiles();

for (const file of sourceFiles) {
  console.log('Processing:', file.getBaseName());

  const oldPath = file.getFilePath();
  const newPath = oldPath.replace(/\.tsx$/, '.jsx');

  fs.renameSync(oldPath, newPath);
}

console.log('Done');
