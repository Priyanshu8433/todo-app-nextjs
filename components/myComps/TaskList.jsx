"use client";

import TaskCard from "./TaskCard";

const TaskList = ({ taskList, setTaskList }) => {
  return (
    <div className="max-h-[480px] p-4 overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-4 ">
        {taskList.map((task) => (
          <TaskCard
            key={task._id}
            _id={task._id}
            taskList={taskList}
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
