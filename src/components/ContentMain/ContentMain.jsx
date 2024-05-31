import "./ContentMain.css";
import Tasks from "../Tasks/Tasks";
import TaskPriority from "../TaskPriority/TaskPriority";


const ContentMain = () => {
  return (
    <div className="subgrid-two">
      <div className="transactions">
        <Tasks />
      </div>
      <div className="loans">        
        <TaskPriority />
      </div>
    </div>

  )
}

export default ContentMain
