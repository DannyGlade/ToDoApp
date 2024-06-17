import { TaskClass } from "@/constants/Types";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const TASKS_KEY = "TASKS";
const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveTasks = async (tasks: TaskClass[]) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error(error);
  }
};

const modifyTask = async (task?: TaskClass) => {
  try {
    if (task) {
      const tasks = await getTasks();
      const updatedTasks = tasks.map((t: TaskClass) =>
        t.id === task.id ? task : t
      );
      await saveTasks(updatedTasks);
    }
  } catch (error) {
    console.error(error);
  }
};

export default function useTaskList() {
  const [tasks, setTasks] = useState<TaskClass[]>([]);

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks.map((task: TaskClass) => new TaskClass(task)));
    });
  }, []);

  useEffect(() => {
    modifyTask();
  }, [tasks]);

  const refreshTasks = () => {
    return new Promise<void>((resolve) => {
      getTasks().then((tasks) => {
        setTasks(tasks.map((task: TaskClass) => new TaskClass(task)));
        resolve();
      });
    });
  };

  const handleStatusChange = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.toggleStatus();
        modifyTask(task);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = (title: string, status: boolean) => {
    return new Promise<void>((resolve) => {
      const newTask = new TaskClass({
        id: tasks.length + 1,
        title,
        status,
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      saveTasks([...tasks, newTask]);
      resolve();
    });
  };

  return { tasks, handleStatusChange, addTask, refreshTasks };
}
