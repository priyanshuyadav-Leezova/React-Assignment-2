import { useReducer, useEffect, useState } from 'react';
import { storageService } from '../storage/storage';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': return [...state, action.payload];
    case 'DELETE_TASK': return state.filter(t => t.id !== action.payload);
    case 'TOGGLE_TASK': return state.map(t => t.id === action.payload ? { ...t, isCompleted: !t.isCompleted } : t);
    case 'UPDATE_TASK': return state.map(t => t.id === action.payload.id ? { ...t, text: action.payload.text } : t);
    default: return state;
  }
};

export const useTodo = (userEmail) => {
  const [tasks, dispatch] = useReducer(todoReducer, [], () => {
    return storageService.getTasks().filter(task => task.userId === userEmail);
  });

  const [ui, setUi] = useState({
    input: "",
    editId: null,
    filter: "all"
  });

  const sync = (action, nextTasks) => {
    const otherUsersTasks = storageService.getTasks().filter(t => t.userId !== userEmail);
    storageService.saveTasks([...otherUsersTasks, ...nextTasks]);
    dispatch(action);
  };

  const handleSave = () => {
    if (!ui.input.trim()) return;

    if (ui.editId) {
      const action = { type: 'UPDATE_TASK', payload: { id: ui.editId, text: ui.input } };
      const nextTasks = tasks.map(t => t.id === ui.editId ? { ...t, text: ui.input } : t);
      sync(action, nextTasks);
    } else {
      const newTask = { id: Date.now(), text: ui.input, isCompleted: false, userId: userEmail };
      sync({ type: 'ADD_TASK', payload: newTask }, [...tasks, newTask]);
    }
    setUi(prev => ({ ...prev, input: "", editId: null }));
  };

  const toggleTask = (id) => {
    const nextTasks = tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t);
    const resetEdit = ui.editId === id ? { input: "", editId: null } : {};
    sync({ type: 'TOGGLE_TASK', payload: id }, nextTasks);
    if (ui.editId === id) setUi(prev => ({ ...prev, ...resetEdit }));
  };

  const handleDelete = (id, text) => {
    if (window.confirm(`Delete "${text}"?`)) {
      sync({ type: 'DELETE_TASK', payload: id }, tasks.filter(t => t.id !== id));
      if (ui.editId === id) setUi(prev => ({ ...prev, input: "", editId: null }));
    }
  };

  const handleEdit = (t) => setUi(prev => ({ ...prev, input: t.text, editId: t.id }));

  const updateUi = (key, value) => setUi(prev => ({ ...prev, [key]: value }));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setUi(prev => ({ ...prev, input: "", editId: null }));
  };

  const filteredTasks = tasks.filter(t => {
    if (ui.filter === 'incomplete') return !t.isCompleted;
    if (ui.filter === 'complete') return t.isCompleted;
    return true;
  });

  return {
    tasks: filteredTasks,
    ui,
    updateUi,
    handleSave,
    handleEdit,
    handleDelete,
    handleKeyDown,
    toggleTask,
    clearEdit: () => setUi(prev => ({ ...prev, input: "", editId: null }))
  };
};