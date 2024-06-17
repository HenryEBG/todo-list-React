import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useReducer,useRef } from 'react'
function App() {
  //const [indexTodo, setindexTodo] = useState(0)
  const addInputRef=useRef();
  const [todolist,dispatch] = useReducer((state=[],action) => {
   switch (action.type) {
      case 'add_todo' :{
        return [{title:action.title},...state];
      }
      case 'remove_todo': {
        return state.filter((todo,index) => index!= action.index  )
      }
      default : {
        return state;
      }    
   }
  });

  const handleSubmit = (event) => {
    // prevent the form refresh the page
    event.preventDefault();
    dispatch({
      type:'add_todo',
      title : addInputRef.current.value
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
       todolist && todolist.map((todo,index) => (
         <div className='todoItem' key={index}>
              <input type="checkbox" />
              <p>{todo.title}</p>
              <button>Edit</button>
              <button onClick={() => dispatch({type: 'remove_todo', index })}>Delete</button>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default App
