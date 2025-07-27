import "./App.css";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid2';
import Todo from "./Todo";
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from "uuid";
import {useState,useContext,useEffect} from "react";
import {TodosContext} from "./contexts/TodosContext"



export default function TodoList() {
const {todos,setTodos}=useContext(TodosContext)
  const [titleInput,setTitleInput]=useState("")
  const [displayedTodosType,setDisplayedTodosType]=useState("all")
  
  // filteration arrays
  const completedTodos=(todos||[]).filter((t)=>{
    return (t.isCompleted);
  });
  const notCompletedTodos=(todos||[]).filter((t)=>{
    return (!t.isCompleted);
  });
  let todosToBeRendered=todos;
   if (displayedTodosType==="completed")
    {
      todosToBeRendered=completedTodos;
    } else if(displayedTodosType==="notCompleted")
    {
      todosToBeRendered=notCompletedTodos;
    }else{
      todosToBeRendered=todos;
    }
    const todosJsx=todosToBeRendered.map((t)=>{
      return <Todo key={t.id} todo={t} />;
    })
  useEffect(()=>{
    console.log("calling use effect");
    const storageTodos=JSON.parse(localStorage.getItem("todos"))
    setTodos(storageTodos);
  },[]);

  function changeDisplayedType(e){
    //console.log(e.target.value);
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick(){
    //alert("hello");
    const newTodo={
      id:uuidv4(),
      title:titleInput,
      details:"",
      isCompleted:false
    }
    const updatedTodos=[...todos,newTodo]
    setTodos(updatedTodos);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  return (
    <div>
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }}
        style={{
          maxHeight:"80vh",
          overflowY:"auto",
        }}>

          <CardContent>
            
          <Typography variant="h2" >
            مهامي
        </Typography>
        <Divider/>
        <ToggleButtonGroup
        style={{direction:"ltr",marginTop:"1.8rem"}}
      value={displayedTodosType}
      exclusive
      onChange={changeDisplayedType}
      aria-label="text alignment"
      color="primary"
    >
      <ToggleButton value="notCompleted">غير المنجز</ToggleButton>
      <ToggleButton value="completed">المنجز</ToggleButton>
      <ToggleButton value="all">الكل</ToggleButton>

    </ToggleButtonGroup>
    { /*All Todos */}
    {todosJsx}
    {/* ===All Todos===*/}
    <Grid container style={{marginTop:"1.2rem"}} spacing={2}>
        <Grid size={8}>
        <TextField value={titleInput} onChange={(e)=>{setTitleInput(e.target.value);}}
         id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{direction:"ltr",width:"100%"}}/>
        </Grid>
        <Grid size={4}>
        <Button onClick={handleAddClick} variant="contained" style={{width:"100%",height:"100%"}}
        disabled={titleInput.length===0}>إضافة</Button> 
        </Grid> 
      </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
