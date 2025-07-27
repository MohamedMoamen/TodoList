import './App.css';
import TodoList from "./TodoList";
import {createTheme,ThemeProvider} from "@mui/material/styles"
import {TodosContext} from "./contexts/TodosContext"
import {v4 as uuidv4} from "uuid";
import {useState} from "react";

const theme=createTheme({
  typography:{fontFamily:["A"],},
palette:{
  primary:{
    main:"#4a148c",
  },
},
});
const initialTodos =[
  {
    id:uuidv4(),
    title:"قراءة كتاب ",
    details:"الفيزياء",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"قراءة كتاب ",
    details:"الكيمياء",
    isCompleted:false
  },
  {
    id:uuidv4(),
    title:"قراءة كتاب ",
    details:"الاحياء",
    isCompleted:false
  }
]
function App() {
  const [todos,setTodos]=useState(initialTodos)
  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{display:"flex",
                                 justifyContent:"center",
                                 alignItems:"center",
                                 height:"100vh",
                                 direction:"rtl"
    }}>
     <TodosContext.Provider value={{todos:todos,setTodos:setTodos}}>
      <TodoList/>
     </TodosContext.Provider> 
    </div>
    </ThemeProvider>
  );
}

export default App;
