import { useState } from 'react';

const LucideIcon = ({ name, size = 24, className }) => {
  const iconData = window.lucide[name];
  if (!iconData) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {iconData.map((part, i) => {
        const [tag, attrs] = part;
        const Tag = tag;
        return <Tag key={i} {...attrs} />;
      })}
    </svg>
  );
};

const TODOS = [
  { id: 1, text: 'Build App', completed: true },
  { id: 2, text: 'Test app', completed: true },
  { id: 3, text: 'Demo app', completed: true },
  { id: 4, text: 'Add Icon Import', completed: false },
  // Single...?
  // Multi lesson.... (stepped...? Each one gets their own)
  { id: 4, text: 'Figure out entry resolution', completed: false },
];

export default function TodoApp() {
  const [todos, setTodos] = useState(TODOS);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0b0f] p-4 md:p-8 flex justify-center font-sans transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a24] rounded-2xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <LucideIcon name="ListTodo" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">TaskFlow</h1>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-8">
          <input
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
            <LucideIcon name="Plus" size={20} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </form>

        {/* List */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                todo.completed
                  ? 'bg-slate-50 dark:bg-slate-900 border-transparent dark:border-slate-800'
                  : 'bg-white dark:bg-[#252535] border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900'
              }`}
            >
              <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleTodo(todo.id)}>
                <div
                  className={`transition-colors ${todo.completed ? 'text-indigo-500' : 'text-slate-300 group-hover:text-indigo-400'}`}
                >
                  {todo.completed ? (
                    <LucideIcon name="CheckCircle" size={22} />
                  ) : (
                    <LucideIcon name="Circle" size={22} />
                  )}
                </div>
                <span
                  className={`text-lg transition-all ${todo.completed ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}`}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-all p-2"
              >
                <LucideIcon name="Trash2" size={18} />
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center py-10">
            <div className="text-slate-300 dark:text-slate-700 mb-2">
              <LucideIcon name="CheckCircle" size={48} className="mx-auto opacity-20" />
            </div>
            <p className="text-slate-400 dark:text-slate-600 italic">No tasks yet. Get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
