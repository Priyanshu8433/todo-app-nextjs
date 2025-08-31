"use client";

import TaskInput from "@/components/myComps/TaskInput";
import TaskList from "@/components/myComps/TaskList";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/theme-toggle-button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get("/api/tasks");
        if (!cancelled) {
          setTaskList(Array.isArray(data?.tasks) ? data.tasks : []);
        }
      } catch (error) {
        if (!cancelled) setTaskList([]);
        console.error("Error fetching tasks:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-background">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className={"h-[600px] w-[400px] px-4 py-8"}>
        {/* INPUT FIELD */}
        <TaskInput taskList={taskList} setTaskList={setTaskList} />
        <Separator />
        {/* TASKS LIST */}
        <TaskList taskList={taskList} setTaskList={setTaskList} />
      </Card>
    </div>
  );
}
