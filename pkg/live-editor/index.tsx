'use client';
import { Orchestrator } from './Orchestrator';
import { BootSelectPage } from './app/BootSelectPage';
// import { EditorPage } from './app/EditorPage';
import { EditorPage2 } from './app/EditorPage2';

function getPage(key) {
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
const DefaultExport = getPage('editor');

export default DefaultExport;
