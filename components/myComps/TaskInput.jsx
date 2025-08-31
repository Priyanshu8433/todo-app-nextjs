"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";

const TaskInput = ({ className, taskList, setTaskList }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async (title) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/tasks", { title });
      setTaskList([response.data.task, ...taskList]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className={clsx("flex gap-4", className)}>
      <Input
        type="text"
        placeholder="Create a task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button onClick={() => addTask(title)} disabled={loading}>
        {loading ? <Loader2Icon className="animate-spin" /> : "Add"}
      </Button>
    </div>
  );
};

export default TaskInput;
