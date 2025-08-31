import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import axios from "axios";
import { useState } from "react";
import { Loader2Icon, Trash } from "lucide-react";

const TaskCard = ({ _id, title, completed, taskList, setTaskList }) => {
  const [loading, setLoading] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(completed);

  const toggleTask = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/tasks`, { id: _id, completed: !localCompleted });
      setLocalCompleted(!localCompleted);
    } catch (error) {
      setLocalCompleted(completed);
      console.error(error);
    }
    setLoading(false);
  };

  const deleteTask = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/tasks`, { data: { id: _id } });
      setTaskList(taskList.filter((task) => task._id !== _id));
      console.log("Task Deleted");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <div className="flex gap-4 items-center bg-muted p-4 rounded-md">
        {loading ? (
          <Loader2Icon
            className={cn("animate-spin", "h-4 w-4 hover:cursor-not-allowed")}
          />
        ) : (
          <div
            className={cn(
              "h-4 w-4 shrink-0 hover:cursor-pointer border border-black",
              localCompleted ? "bg-chart-4" : "bg-chart-1"
            )}
            onClick={toggleTask}
          ></div>
        )}
        <span
          className={cn(
            "inline-block px-1 text-foreground font-mono min-w-0 max-w-full relative"
          )}
        >
          {localCompleted && (
            <div
              className={cn(
                "h-[1px] w-full bg-foreground absolute top-1/2 left-0"
              )}
            ></div>
          )}
          {title}
        </span>
        <Trash
          onClick={deleteTask}
          className="h-4 w-4 min-h-4 min-w-4 text-foreground ml-auto transition-colors duration-300 hover:cursor-pointer hover:text-red-500"
        />
      </div>
    </Card>
  );
};

export default TaskCard;
