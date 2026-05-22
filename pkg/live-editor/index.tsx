'use client';
import { Orchestrator } from './Orchestrator';
import { BootSelectPage } from './app/BootSelectPage';
import { EditorPage } from './app/EditorPage';

// export default BootSelectPage;
// export default Orchestrator;

function GetPage(key) {
  switch (key) {
    case 'bootselect':
      return BootSelectPage;
    case 'orchestrator':
      return Orchestrator;
    case 'editor':
      return EditorPage;

    default:
      return BootSelectPage;
  }
}
const DefaultExport = GetPage('orchestrator');

export default DefaultExport;
