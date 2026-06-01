const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'build'], {
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
