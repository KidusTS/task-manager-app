import { useState, useEffect } from 'react';
import type { Task } from '../types';

const STORAGE_KEY = 'taskflow-tasks';

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        endDate: task.endDate ? new Date(task.endDate) : undefined,
      }));
    }
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
  }
  return [];
};

const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, description?: string, priority: Task['priority'] = 'medium', endDate?: Date) => {
    if (tasks.length >= 5) return false;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      endDate,
    };
    setTasks(prev => [...prev, newTask]);
    return true;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    canAddMore: tasks.length < 5,
  };
}