

import Todo from "../models/todo.js"

export const createTodo=async(req,res)=> {


const newTodo = new Todo({
    text:req.body.text,
    completed:req.body.completed
})


let sampleTodo =  await newTodo.save()
res.status(201).json({message:"todo created "},sampleTodo)
// console.log(sampleTodo)
}



export  const todoFind =async (req,res)=>{
    try{
let todos = await Todo.find()
res.status(201).json({message:"finded successfully",todos}) 
    } catch(error){
        console.log(error)
        res.status(400).json({message:"can not fetch todos"})
    }


}
 export const updateTodo = async(req,res)=>{
try{
 let todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
      res.status(201).json({
      message: "Todo updated successfully",
      todo, // now frontend will receive updated todo and message
    });

} catch(error){
    res.status(400).json({message:"error occuring in todo deletion"}) 
}
   

 }

export const deleteTodo = async (req,res)=>{
    try{
           let {id} = req.params
let  deletedTodo = await Todo.findByIdAndDelete(id)


if(!deletedTodo){
    return  res.status(404).json({message:"todo not found"})
}
res.status(201).json(({message:"todo deleted",deletedTodo}))    

    }catch(error){
        console.log(error)
        res.status(404).json({message:"error occuring in todo deletion"})
    }
 
};