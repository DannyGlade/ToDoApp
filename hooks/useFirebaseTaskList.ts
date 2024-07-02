import { TaskClass, TaskListHook } from "@/constants/Types";
import firebase from "@/constants/Firebase";

import { getDatabase, ref, set, onValue } from "firebase/database";
import { SetStateAction, useEffect, useState } from "react";

const db = getDatabase(firebase);

const TASKS_KEY = "TASKS";

const getTasks = async (
  tasks: TaskClass[],
  setTasks: (value: SetStateAction<TaskClass[]>) => void
) => {
  try {
    const taskRef = ref(db, TASKS_KEY);
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      setTasks(data ? Object.values(data) : []);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function useFirebaseTaskList(): TaskListHook {
  const [tasks, setTasks] = useState<TaskClass[]>([]);

  useEffect(() => {
    getTasks(tasks, setTasks);
  }, []);

  const handleStatusChange = async (id: number) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          task.status = !task.status;
          set(ref(db, TASKS_KEY + "/" + task.id), task);
        }
        return task;
      });
    //   setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshTasks = async () => {
    // return new Promise<void>((resolve) => {
    //   const tasksRef = ref(db, TASKS_KEY);
    //   onValue(tasksRef, (snapshot) => {
    //     const data = snapshot.val();
    //     setTasks(data ? Object.values(data) : []);
    //     resolve();
    //   });
    // });
  };

  const addTask = async (title: string, status: boolean) => {
    return new Promise<void>((resolve) => {
      const newTask = new TaskClass({
        id: Date.now(),
        title,
        status,
      });
      set(ref(db, TASKS_KEY + "/" + newTask.id), newTask);
      resolve();
    });
  };

  const deleteTask = async (id: number) => {
    return new Promise<void>((resolve) => {
      set(ref(db, TASKS_KEY + "/" + id), null);
      resolve();
    });
  };

  return {
    tasks,
    handleStatusChange,
    refreshTasks,
    addTask,
    deleteTask,
  };
}
