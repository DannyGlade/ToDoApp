import { TaskClass } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
} from "react-native";

type TaskProps = ComponentProps<typeof View> & {
  task: TaskClass;
  changeStatus: (id: number) => void;
  deleteTask: (id: number) => void;
};

const Task = ({ task, changeStatus, deleteTask, ...props }: TaskProps) => {
  return (
    <View style={[task.status ? styles.doneTask : styles.task, props.style]}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <View style={styles.controls}>
        <View style={styles.statusSwitchContainer}>
          <Switch
            value={task.status}
            style={styles.stausSwitch}
            onValueChange={() => changeStatus(task.id)}
          />
          <Text>{task.status ? "Done" : "Due"}</Text>
        </View>
        <View>
          <TouchableHighlight
            style={styles.deleteButton}
            onPress={() => deleteTask(task.id)}
          >
            <Ionicons name="trash" size={24} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  doneTask: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#e6e6e6",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  statusSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stausSwitch: {
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
});

export default Task;
