import React, { useState } from 'react';

// Use the global window object for icons to bypass module resolution issues
const Icons = window.LucideReact || {};
const { Plus, Trash2, CheckCircle, Circle, ListTodo } = Icons;

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
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
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">{ListTodo && <ListTodo size={24} />}</div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">TaskFlow</h1>
        </div>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition" onClick={addTodo}>
            {Plus ? <Plus size={20} /> : <span>+</span>} Add Todo
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                todo.completed
                  ? 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                  : 'bg-white dark:bg-[#252535] border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                <span
                  className={`${todo.completed ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition"
              >
                Trash
                {/* {Trash2 && <Trash2 size={18} />} */}
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center py-10 text-slate-400 dark:text-slate-600 italic">
            No tasks yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}
