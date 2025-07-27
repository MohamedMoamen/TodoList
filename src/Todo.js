import "./App.css"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {v4 as uuidv4} from "uuid";
import {useState,useContext} from "react";
import {TodosContext} from "./contexts/TodosContext"
import TextField from '@mui/material/TextField';
//Dialog Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const open=false;
export default function Todo({todo,handleCheck}) {
  const {todos,setTodos}=useContext(TodosContext);
  const [showDeleteDialog,setShowDeleteDialog]=useState(false)
  const [showUpdateDialog,setShowUpdateDialog]=useState(false)
  const [updatedTodo,setUpdatedTodo]=useState({title:todo.title,details:todo.details})
  // Event Handlers
  function handleCheckClick(){
   // alert("hello");
   const updatedTodos=todos.map((t)=>{
    if(t.id==todo.id)
    {
      t.isCompleted=!t.isCompleted;
    }
    return t;
   })
   setTodos(updatedTodos);
   localStorage.setItem("todos",JSON.stringify(updatedTodos));

  }
  function handleDeleteClick(){
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose(){
    setShowDeleteDialog(false);
  }
  function handleUpdateClose(){
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm(){
     //alert("hello");
     const updatedTodos=todos.map((t)=>{
      if(t.id==todo.id){
        return{...t,title:updatedTodo.title,details:updatedTodo.details}
      }else{return t}
     })
     setTodos(updatedTodos);
     localStorage.setItem("todos",JSON.stringify(updatedTodos));
     setShowUpdateDialog(false) 
     }
  function handleUpdateClick(){
    setShowUpdateDialog(true);
  }
  function handleDeleteConfirm(){
    const updatedTodos=todos.filter((t)=>{
      // if(t.id==todo.id){
      //   return false
      // }else{
      //   return true
      // }
      return t.id!=todo.id}
    )
  setTodos(updatedTodos)
  localStorage.setItem("todos",JSON.stringify(updatedTodos));

}
  return (
    <>
    {/*Delete Dialog*/}
    <Dialog
        style={{direction:"rtl"}}
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
هل انت متأكد من رغبتك فى حذف المهمة؟              
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button  autoFocus onClick={handleDeleteConfirm}>
            نعم ,قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
    {/*===Delete Dialog===*/}
    {/*Update Dialog*/}
    <Dialog
        style={{direction:"rtl"}}
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
هل انت متأكد من رغبتك فى حذف المهمة؟              
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo,title:e.target.value})
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e)=>{
              setUpdatedTodo({...updatedTodo,details:e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button  autoFocus onClick={handleUpdateConfirm}>
            تأكيد       </Button>
        </DialogActions>
      </Dialog>
    {/*===Update Dialog===*/}
      <Card className={"todoCard"}
        sx={{
          minWidth: 275,
          backgroundColor: "blue",
          color: "white",
          fontSize: "1.2rem",
          marginTop:"1rem"
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography
                variant="h2"
                sx={{ fontSize: "1.2rem", textAlign: "right",textDecoration:todo.isCompleted?"line-through":"none"}}
              >
              {todo.title} 
               </Typography>
              <Typography
                variant="h5"
                sx={{ fontSize: "20px1.2rem", textAlign: "right" }}
              >
            {todo.details} 
            </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid size={6} style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
            {/* Check Icon Button */}
             <IconButton 
             onClick={()=>{
              handleCheckClick();
             }}
             className={"iconButton"} style={{
              background:todo.isCompleted?"green":"white"
             ,color:todo.isCompleted?"white":"green",
             border:"solid green 1.5px"}}>
            <CheckIcon/>
            </IconButton>
            {/* ===Check Icon Button===*/}
           {/*Update Icon Button*/}
            <IconButton onClick={handleUpdateClick}
             className={"iconButton"} style={{backgroundColor:"white",color:"blue",border:"solid blue 1.5px"}}>
              <EditIcon/>
            </IconButton>
          {/*===Update Icon Button===*/}

            {/*Delete Icon Button*/}
            <IconButton 
            className={"iconButton"} 
             style={{backgroundColor:"white",color:"red",border:"solid red 1.5px"}}
            onClick={handleDeleteClick}>
            <DeleteIcon/>
            </IconButton>
            {/*===Delete Icon Button===*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
