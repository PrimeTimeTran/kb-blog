// import DefaultExport, { PI } from './exports';

const mod = require('./exports');

const DefaultExport = mod.default || mod;
const PI = mod.PI;

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <DefaultExport />
      {PI}
    </div>
  );
}
