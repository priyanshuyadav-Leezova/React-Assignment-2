import { useNavigate } from 'react-router-dom';

import { useTodo } from '../../utils/todo';
import { useAuth } from '../../auth/AuthContext';
import { Input, Button, Navbar } from '../../components';
import '../../App.css';

const TodoApp = () => {
const { user } = useAuth();
const todo = useTodo(user?.email);
const navigate = useNavigate(); 
  return (
    <div className="dashboardContainer">
      <Navbar />
      <div className="backButtonArea">
        <button 
          className="backBtn" 
          onClick={() => navigate('/dashboard')}>← Back to Dashboard
        </button>
      </div>
      <div className="todopageContent">
        <div className="formContainer todo-card">
          <h2>{todo.ui.editId ? "Edit Task" : "Create a Task"}</h2>
          <div className="todoinputWrapper">
            <Input
              label="Task Description"
              name="task"
              type="text"
              value={todo.ui.input} 
              onChange={(e) => todo.updateUi('input', e.target.value)} 
              required={false}
              onKeyDown={todo.handleKeyDown}
            />
            <div className="buttonGroup">
              <Button onClick={todo.handleSave}>
                {todo.ui.editId ? "Update Task" : "Add Task"}
              </Button>
              {todo.ui.editId && (
                <button className="cancel-link" onClick={todo.clearEdit}>Cancel</button>
              )}
            </div>
          </div>

          <div className="todoFilters">
            {['all', 'incomplete', 'complete'].map((f) => (
              <button
                key={f}
                className={todo.ui.filter === f ? 'filter-btn active' : 'filter-btn'}
                onClick={() => todo.updateUi('filter', f)} 
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="todolistContainer">
          {todo.tasks.length > 0 ? (
            todo.tasks.map(t => (
              <div key={t.id} className={`todoItem ${t.isCompleted ? 'completed' : ''}`}>
                <div className="itemLeft">
                  <input
                    type="checkbox"
                    className="todoCheckbox"
                    checked={t.isCompleted}
                    onChange={() => todo.toggleTask(t.id)}
                  />
                  <span className="taskText">{t.text}</span>
                </div>

                <div className="itemActions">
                  <button
                    className="actionBtn editBtn"
                    onClick={() => todo.handleEdit(t)}
                    disabled={t.isCompleted}>Edit</button>
                  <button
                    className="actionBtn deleteBtn"
                    onClick={() => todo.handleDelete(t.id, t.text)}>Delete</button>
                </div>
              </div>
            ))
          ) : (<p className="emptyMsg">No tasks found for this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;