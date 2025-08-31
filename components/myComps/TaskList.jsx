"use client";

import TaskCard from "./TaskCard";

const TaskList = ({ taskList, setTaskList }) => {
  const safeTasks = Array.isArray(taskList) ? taskList : [];
  return (
    <div className="max-h-[480px] p-4 overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-4 ">
        {safeTasks.length === 0 && (
          <p className="text-sm text-muted-foreground">No tasks found.</p>
        )}
        {safeTasks.map((task) => (
          <TaskCard
            key={task._id}
            _id={task._id}
            taskList={safeTasks}
            setTaskList={setTaskList}
            title={task.title}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
