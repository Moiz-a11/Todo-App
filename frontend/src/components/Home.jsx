

    import React from "react"
    import axios from "axios";  
    import {useState,useEffect} from "react"
    import "../stl.css"
    import {toast}  from "react-hot-toast"
     import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

    import "./stl.css"

    //import { deleteTodo } from "../backend/controller/todoController";
const logout =  async ()=>{
  try{
   await axios.get("http://localhost:9999/user/logout")
toast.success("user loged out successfully")
localStorage.removeItem("jwt");
{/* <Navigate to={"/login"}/> */}


  } catch(error){

    toast.error("error in logedout");

  }

}
    function Home(){
        const [todos,setTodos] = useState([])
        const [error ,setError] =useState(null)
        const [loading ,setLoading] =useState(false)
        const [newTodos,setNewTodos] = useState("")

        useEffect(()=>{ // use effect becoz handeling real time changes
            const fetchTodos=async()=>{
                try{
                    setLoading(true)
                const response = await axios.get("http://localhost:9999/todo/fetch",{
                    withCredentials:true, // acccept backend response

                    headers:{
                        "content-Type":"application/json",// json data fetch kar rahe
                    },
                });
                
                 //console.log(response.data.todos)
                 setTodos(response.data.todos)
                 setError(null)

                } catch(error){
                    setError("failed to fetch data")
                } finally{
                    setLoading(false)
                }
                
            }
            fetchTodos();
        },[]);

    const createTodo =async()=>{

     
    if(!newTodos) return;

    try{
    const response = await axios.post("http://localhost:9999/todo/create",
        {
            text:newTodos,
            completed:false
        },
        {
        withCredentials:true

    },

    )
 setTodos([...todos, response.data.todo])
console.log(response.data)
 // old todo,s + newTodos
    setNewTodos("")
    }catch(error){
        console.log(error)
        setError("failed to create todo")

    }

    }

    const TodoStatus = async(id)=>{
        const todo= todos.find((t)=>t._id===id)
        try{
            
        const response = await axios.put(`http://localhost:9999/todo/update/${id}`,

            {

    ...todo, // old todo

    completed: !todo.completed,

        },{
            withCredentials:true,
        });

 console.log(response.data)

        setTodos(todos.map((t) => t._id === id ? response.data.todo : t))
       
        } catch(error){
            console.log(error)
            setError("failed to find todo status")
        }
        
    }
   

    const DeleteTodo=async(id)=>{
        try{
    await axios.delete(`http://localhost:9999/todo/delete/${id}`,{
    withCredentials:true

    })

    // const remainingTodos = todos.filter((todo)=>!todo.completed).length;
    setTodos(todos.filter((t)=>t._id!==id))
        } catch(error){
            console.log(error)
            setError("could not delete todo") // setting current deleted todo not equal to todo inside DB
        }
    }
        return(
            <div className="d-flex vh-100 vw-80 bg-pink border border-2 border-black flex-column justify-content-center align-items-center ">
    <div className=" d-flex w-100  justify-content-center flex-column align-items-center" >
        <h1>Todo App</h1>

    <span  className="d-flex mt-5 w-100">
        
        <input
        value={newTodos}
         onKeyPress={(e)=>e.key=="Enter" && createTodo()}
          onChange={(e) => setNewTodos(e.target.value)} className="form-control  offset-4 me-2" type="text"/>
         
    <button onClick={createTodo} className="btn btn-primary">Add</button>
    </span>
    </div>
{loading ? (
  <div className="text-center mt-4">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading..</span>
    </div>
  </div>
) : error ? (
  <div className="text-center text-danger">{error}</div>
) : (
  <ul className="todo-list mt-5 w-100 d-flex flex-column align-items-center">
    {todos.map((todo, index) => (
      <li
        key={todo._id || index}
        className={`todo-item d-flex justify-content-between align-items-center p-3 mb-3 shadow-sm rounded-3 w-50 ${
          todo.completed ? "todo-completed" : ""
        }`}
      >
        <div className="d-flex align-items-center gap-3">
          <input
            checked={todo.completed}
            onChange={() => TodoStatus(todo._id)}
            type="checkbox"
            className="form-check-input"
          />
          <span
            className={`fs-5 ${
              todo.completed ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            {todo.text}
          </span>
        </div>
        <button onClick={() => DeleteTodo(todo._id)} className="btn btn-sm btn-outline-danger">
          Delete
        </button>
      </li>
    ))}
  </ul>
)}

 
    <div className="d-flex justify-content-center flex-column align-items-center mt-5 "> <p>{todos.filter(todo => !todo.completed).length} remaining todos</p>
    <button onClick={()=> logout()} className="btn btn-success" >Logout</button></div>

    </div>


        )
    }

    export default Home;