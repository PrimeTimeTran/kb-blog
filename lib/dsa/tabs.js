import { useState } from 'react';

export default function Tabs() {
  const tabs = [
    { id: 'overview', label: 'Filter by Tag', content: 'This is the overview tab.' },
    { id: 'details', label: 'Explore', content: 'Here are the details.' },
    { id: 'settings', label: 'Settings', content: 'Adjust your settings here.' },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="flex border-b border-gray-200">
        {(tabs ?? []).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-colors\n -mb-px px-4 py-2 text-sm font-medium ${
              activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-b-lg border border-t-0 border-gray-200 bg-white p-4">
        {(tabs ?? []).map(
          (tab) =>
            tab.id === activeTab && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
}
