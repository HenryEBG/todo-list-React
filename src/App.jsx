import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useReducer, useRef } from 'react'
function App() {
  //const [indexTodo, setindexTodo] = useState(0)
  // create a useRef Hook to control the input to create or modify a todo task
  const addInputRef = useRef();

  // create a useReducer Hook to manage all the diferents actions to the todo list
  const [todolist, dispatch] = useReducer((state = [], action) => {
    switch (action.type) {
      //action to add a new todo task
      case 'add_todo': {
        // to do structure is
        // id: a number of the date and time to be always different
        // title: the description of the TransformStream
        // isComplete: a flag to complete or mark as incomplete a task
        const newTodo ={ id: Date.now(), title: action.title, isComplete: true };
        //clean the input
        addInputRef.current.value='';
        addInputRef.current.focus();
        //return the list with the new todo at the beginning
        return [newTodo, ...state];
      }
      // action to remove a todo item
      case 'remove_todo': {
        //filter is apply to the list to return an aaray without the task mark to be deleted
        return state.filter((todo) => todo.id != action.id)
      }
      //action to mark as a complete or incomplete task
      case 'toggle_isComplete': {
        // we map the list of todos if the todo is equal to the id of the selected task
        // the function change the isComplete property to the inverse value (false-true)
        return state.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              isComplete: !todo.isComplete
            }
          }
          //if not the todo is no equal to the id just return the todo without modify
          return todo;
        })
      }
      //action to edit a todo item from the list
      case 'edit_todo': {
        //the same process with the check.  If the id is equal change the title
        return state.map((todo) => {
          if (todo.id === action.id) {
            return {
              ...todo,
              title: action.title
            }
          }
          //if not the todo is no equal to the id just return the todo without modify
          return todo;
        })
      }
      //default action if it is call an action not described above
      default: {
        return state;
      }
    }
  });
// function to handle the event to add a new task
  const handleSubmit = (event) => {
    // prevent the form refresh the page
    event.preventDefault();
    //the dispatch of the useReducer hook is call with the type add_todo
    dispatch({
      type: 'add_todo',
      title: addInputRef.current.value
    })

  }

  return (
    <div>
      {/* The header of the  Todo List */}
      <h1>Todo List</h1>
      {/* The form with to add new todo */}
      <form onSubmit={handleSubmit}>
        <label >Tarea</label>
        <input type="text" name="title" ref={addInputRef} />
        <input type="submit" value="Add" />
      </form>
      {/* list of todos  */}
      <div>
        {
          todolist && todolist.map((todo) => (
            <div className='todoItem' key={todo.id}>

              <input type="checkbox" checked={todo.isComplete} onChange={() => dispatch({ type: 'toggle_isComplete', id: todo.id })} />
              <p>{todo.title}</p>
              <button onClick={() => dispatch({ type: 'edit_todo', id: todo.id, title: `${todo.title} modificado` })}>Edit</button>
              <button onClick={() => dispatch({ type: 'remove_todo', id: todo.id })}>Delete</button>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
