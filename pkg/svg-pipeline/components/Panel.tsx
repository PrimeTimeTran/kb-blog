import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, GripVertical } from 'lucide-react';

import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { useDraggable } from '../hooks/useDraggable';

type Tab = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

type PanelProps = {
  className?: string;

  title?: string;

  tabs?: Tab[];

  defaultTab?: string;

  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;

  children?: React.ReactNode;
};

export function Panel({
  className = '',

  title = 'Panel',

  tabs,

  defaultTab,

  footerLeft,
  footerRight,

  children,
}: PanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const fallbackTabs = useMemo(
    () => [
      { id: 'layers', label: 'Layers', content: <div>BG Clouds</div> },
      { id: 'assets', label: 'Assets', content: <div>assets</div> },
      { id: 'export', label: 'Export', content: <div>export</div> },
    ],
    [],
  );

  const tabsResolved = tabs?.length ? tabs : fallbackTabs;
  const defaultActiveTab = defaultTab ?? tabsResolved[0].id;
  const [activeTab, setActiveTab] = useState(() => defaultActiveTab);
  const active = tabsResolved.find((t) => t.id === activeTab);
  const { pos, bind } = useDraggable({ x: 40, y: 40 });

  return (
    <div
      className={[
        'absolute z-99 border border-white/10 bg-zinc-950/95 backdrop-blur shadow-2xl flex flex-col',
        className,
      ].join(' ')}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <div className="flex items-center justify-between border-b border-white/10 min-h-[40px]">
        <div className="flex items-center flex-1 min-w-0">
          <div
            {...bind}
            className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={14} />
          </div>

          <div className="flex items-center overflow-x-auto">
            {tabsResolved.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      setActiveTab(tab.id);
                      return;
                    }

                    setActiveTab(tab.id);
                  }}
                  className={[
                    'h-[40px] px-3 text-xs transition border-b whitespace-nowrap',
                    isActive
                      ? 'text-white border-green-400 bg-white/5'
                      : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center shrink-0">
          <button
            onClick={() => setCollapsed((x) => !x)}
            className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>

          <button className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition">
            <Menu size={16} />
          </button>
        </div>
      </div>
      <motion.div
        animate={{
          height: collapsed ? 0 : 'auto',
          opacity: collapsed ? 0 : 1,
        }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
        style={{
          overflow: 'hidden',
          pointerEvents: collapsed ? 'none' : 'auto',
        }}
        className="flex flex-col"
      >
        <div className="flex-1 overflow-auto">
          {tabs ? active?.content : <div className="p-2">{active?.content}</div>}
          {!tabs && children}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 min-h-[36px] px-2">
          {footerLeft}
          {footerRight}
        </div>
      </motion.div>
    </div>
  );
}

export function LayerRow({ node, depth, layerModel }: any) {
  const [open, setOpen] = useState(false);

  const visible = layerModel.getLayerState(node.id)?.visible ?? true;

  const groupId = node.parentId ?? node.id;
  const groupColor = layerModel.getColor(groupId);

  const isHovered = layerModel.hovered === node.id || layerModel.hoveredGroup === groupId;

  const rowClass = [
    'group flex items-center rounded cursor-pointer select-none transition border border-transparent px-2',
    visible ? 'opacity-100' : 'opacity-40',
    isHovered ? 'ring-1' : '',
  ].join(' ');

  return (
    <div
      className={rowClass}
      style={{
        ...(isHovered && {
          borderColor: groupColor,
          background: `${groupColor}15`,
        }),
      }}
      onMouseEnter={() => {
        layerModel.setHoveredId(node.id);
        layerModel.measure(node.id);
      }}
      onMouseLeave={() => {
        layerModel.setHoveredId(null);
      }}
    >
      {/* LEFT CONTROLS */}
      <div className="flex items-center">
        <button
          className="w-7 flex items-center justify-center hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation();
            layerModel.toggleVisibility(node.id);
          }}
        >
          <span className={visible ? 'text-success' : 'text-gray-500'}>{visible ? <Eye /> : <Eye />}</span>
        </button>

        <div className="relative">
          <div
            className="w-7 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <div className="w-3 h-3 rounded-full border border-white/30" style={{ background: groupColor }} />
          </div>

          {open && (
            <div
              className="absolute left-full top-0 ml-1 flex gap-1 p-1 rounded bg-zinc-900 border border-white/10 z-50"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {layerModel.colors.map((c: string) => (
                <button
                  key={c}
                  className="w-4 h-4 rounded-full hover:scale-110"
                  style={{ background: c }}
                  onClick={(e) => {
                    e.stopPropagation();
                    layerModel.setGroupColor(groupId, c);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* LABEL */}
      <div
        className="flex-1 flex items-center justify-between py-1 pr-2"
        onClick={() => layerModel.toggleVisibility(node.id)}
        style={{
          paddingLeft: depth * 8,
        }}
      >
        <span className="truncate text-green-300">{node.name}</span>
        <span className="opacity-50 text-[10px]">z:{node.zIndex}</span>
      </div>
    </div>
  );
}
export function LayersTab({ layerModel }: any) {
  function renderTree(nodes: any[], depth = 0) {
    return nodes.map((node) => {
      return (
        <div key={node.id}>
          <LayerRow node={node} depth={depth} layerModel={layerModel} />
          {node.children?.length > 0 && renderTree(node.children, depth + 1)}
        </div>
      );
    });
  }

  return renderTree(layerModel.tree);
}
