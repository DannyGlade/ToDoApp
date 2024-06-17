import { TaskClass } from "@/constants/Types";
import React, { ComponentProps } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";

type TaskProps = ComponentProps<typeof View> & {
  task: TaskClass;
  changeStatus: (id: number) => void;
};

const Task = ({ task, changeStatus, ...props }: TaskProps) => {
  return (
    <View style={[task.status ? styles.doneTask : styles.task, props.style]}>
      <Text style={styles.taskTitle}>{task.title}</Text>

      <View style={styles.statusSwitchContainer}>
        <Switch
          value={task.status}
          style={styles.stausSwitch}
          onValueChange={() => changeStatus(task.id)}
        />
        <Text>{task.status ? "Done" : "Due"}</Text>
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
  statusSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stausSwitch: {
    marginRight: 10,
  },
});

export default Task;
