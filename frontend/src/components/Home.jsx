

    import React from "react"
    import axios from "axios";  
    import {useState,useEffect} from "react"
    import "../stl.css"
import { deleteTodo } from "../../../backend/controller/todoController";

    function Home(){
        const [todos,setTodos] = useState([])
        const [error ,setError] =useState(null)
        const [loading ,setLoading] =useState(false)
        const [newTodos,setNewTodos] = useState("")

        useEffect(()=>{
            const fetchTodos=async()=>{
                try{
                    setLoading(true)
                const response = await axios.get("http://localhost:3000/todo/fetch",{
                    withCredentials:true, // acccept backend response
                    headers:{
                        "content-Type":"application/json",
                    },
                });
                
                 console.log(response.data)
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
    const response = await axios.post("http://localhost:3000/todo/create",
        {
            text:newTodos,
            completed:false
        },
        {
        withCredentials:true

    },

    )
    setTodos([...todos,response.data]) // old todo,s + newTodos
    setNewTodos("")
    }catch(error){
        console.log(error)
        setError("failed to create todo")

    }

    }

    const TodoStatus = async(id)=>{
        const todo= todos.find((t)=>t._id===id)
        try{
        const response = await axios.put(`http://localhost:3000/todo/update/${id}`,
            {
    ...todo, // old todo
    completed:!todo.completed
        },{
            withCredentials:true
        })
        setTodos(todo.map((t)=>t._id===id?response.data:t))
        } catch(error){
            console.log(error)
            setError("failed to find todo status")
        }
    }

    const DeleteTodo=async(id)=>{
        try{
    await axios.delete(`http://localhost:3000/todo/delete/${id}`,{
    withCredentials:true

    })
    setTodos(todos.filter((t)=>t._id!==id))
        } catch(error){
            console.log(error)
            setError("could not delete todo ") // setting current deleted todo not equal to todo inside DB
        }

    }
        return(

            <div className="d-flex vh-100 vw-80 bg-pink border border-2 border-black flex-column justify-content-center align-items-center ">
    <div className=" d-flex w-100  justify-content-center flex-column align-items-center" >
        <h1>Todo App</h1>

    <span  className="d-flex mt-5 w-100" ><input className="form-control  offset-4 me-2" type="text"/><button className="btn btn-primary">Add</button></span>
    </div>

    <ul className="mt-5 m-10 w-100" >

        {todos.map((todo,index)=>(
             <li key={todo._id|| index} className="mb-3 w-40 " >
            <div className="d-flex justify-content-center align-items-center w-100 gap-5 "><input type="checkbox"/>
            <span className="" > {todo.text}</span>
            <button className="btn btn-danger" onClick={DeleteTodo} >Delete</button>
            </div>
        </li> 
        ))}
        
   
    </ul>
    
    <div className="d-flex justify-content-center flex-column align-items-center mt-5 "><p>0 Todo Remaining</p>
    <button className="btn btn-success" >Logout</button></div>

    </div>


        )
    }

    export default Home;