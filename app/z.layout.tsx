'use client';
import Prism from 'prismjs';
import { useEffect } from 'react';

import AceEditor from 'react-ace';

// import dynamic from 'next/dynamic';

import { BaseEditor } from '@/components/BaseEditor';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';

// const AceEditor = dynamic(() => import('react-ace'), { ssr: false });

const config = {
  mode: 'javascript',
  value: `import Link, { LinkProps } from 'next/link';

export function SafeLink({ href, children, className, ...props }) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}`,
};
export default function Layout() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <html>
      <body>
        <div>
          Editor Preview!
          <BaseEditor mode={config.mode} value={config.value} onChange={undefined} />
          <AceEditor
            width="100%"
            mode={config.mode}
            value={config.value}
            fontSize={14}
            name="ace-editor"
            theme={'xcode'}
            height={'500px'}
          />
        </div>
      </body>
    </html>
  );
}
