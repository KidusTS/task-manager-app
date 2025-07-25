import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTask from "./components/AddTask";
import { ThreeBackground } from "./components/ThreeBackground";
import { useTasks } from './hooks/useTasks';

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTask, canAddMore } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 transition-all duration-500" style={{ position: 'relative' }}>
      <ThreeBackground />
      <div className="relative container mx-auto px-4 py-8" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-600/30 p-8 transition-all duration-300 text-gray-900 dark:text-white" style={{ position: 'relative', zIndex: 2 }}>
            <Header />
            <AddTask onAdd={addTask} canAddMore={canAddMore} />
            <TaskList 
              tasks={tasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
