import Button from "./Button"
function Todo({data}){
  <div>{data} <Button type="delete" /> <Button type="edit" /></div>
}

export default Todo