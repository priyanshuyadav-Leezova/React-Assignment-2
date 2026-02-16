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
        <Button onClick={() => navigate('/dashboard')}>← Back to Dashboard</Button>
      </div>
      <div className="todopageContent">
        <div className="formContainer todo-card">
          <h2>{todo.render.editId ? "Edit Task" : "Create a Task"}</h2>
          <div className="todoinputWrapper">
            <Input
              label="Task Description"
              name="task"
              type="text"
              value={todo.render.input} 
              onChange={(e) => todo.updaterender('input', e.target.value)} 
              reqrenderred={false}
              onKeyDown={todo.handleKeyDown}
            />
            <div className="buttonGroup">
              <Button onClick={todo.handleSave}>
                {todo.render.editId ? "Update Task" : "Add Task"}
              </Button>
              {todo.render.editId && (
                <Button className="cancel-link" onClick={todo.clearEdit}>Cancel</Button>
              )}
            </div>
          </div>

          <div className="todoFilters">
            {['all', 'incomplete', 'complete'].map((f) => (
              <Button
                key={f}
                className={todo.render.filter === f ? 'filter-btn active' : 'filter-btn'}
                onClick={() => todo.updaterender('filter', f)} 
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
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
                  <Button
                    className="actionBtn editBtn"
                    onClick={() => todo.handleEdit(t)}
                    disabled={t.isCompleted}>Edit</Button>
                  <Button
                    className="actionBtn deleteBtn"
                    onClick={() => todo.handleDelete(t.id, t.text)}>Delete</Button>
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