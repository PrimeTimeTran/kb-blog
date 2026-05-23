'use client';
import { Orchestrator } from './Orchestrator';
import { BootSelectPage } from './app/BootSelectPage';
// import { EditorPage } from './app/EditorPage';
import { EditorPage2 } from './app/EditorPage2';

// export default BootSelectPage;
// export default Orchestrator;

function GetPage(key) {
  switch (key) {
    case 'bootselect':
      return BootSelectPage;
    case 'orchestrator':
      return Orchestrator;
    case 'editor':
      return EditorPage2;

    default:
      return BootSelectPage;
  }
}
const DefaultExport = GetPage('editor');

export default DefaultExport;
