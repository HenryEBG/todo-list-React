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
        
        return [{id:Date.now(),title:action.title,isComplete:true},...state];
      }
      case 'remove_todo': {
        return state.filter((todo) => todo.id!= action.id  )
      }
      case 'toggle_isComplete': {  
        console.log(state)
        return state.map(todo => {
         if (todo.id === action.id){
          return { ...todo,
             isComplete:!todo.isComplete
            }
          }
          return todo;
      })
        //return state
      
        // const newState=[...state];
        // let todoIndex=newState.findIndex((todo)=> todo.id===action.id);
        // newState[todoIndex].isComplete= !newState[todoIndex].isComplete;
        
        // return newState;
}

      case 'edit_todo' : {
        //get index
        const todoIndex=state.findIndex(todo => todo.id===action.id)
        //replace the 
        return state.splice(todoIndex,1,{id:action.id,title:action.title})
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
       todolist && todolist.map((todo) => (
         <div className='todoItem' key={todo.id}>
           
              <input type="checkbox" checked={todo.isComplete} onChange={() => dispatch({type:'toggle_isComplete',id:todo.id})}/>
              <p>{todo.title}</p>
              <button  onClick={() => dispatch({type: 'edit_todo', id:todo.id, title:todo.title+"modificado"})}>Edit</button>
              <button onClick={() => dispatch({type: 'remove_todo', id:todo.id })}>Delete</button>
             
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default App
