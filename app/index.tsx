import Task from "@/components/ToDo/Task";
import { TaskClass } from "@/constants/Types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [tasks, setTasks] = useState<TaskClass[]>([
    new TaskClass({ id: 1, title: "Task 1", status: false }),
    new TaskClass({ id: 2, title: "Task 2", status: false }),
    new TaskClass({ id: 3, title: "Task 3", status: false }),
  ]);

  const handleStatusChange = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          task.toggleStatus();
        }
        return task;
      })
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <TouchableHighlight
            onPress={() => console.log("Add task")}
            style={styles.addTask}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.tasks}>
            {tasks.length === 0 && <Text>No tasks</Text>}

            {tasks.length > 0 && (
              <>
                <Text style={styles.listTitle}>Due</Text>
                {tasks.map(
                  (task) =>
                    task.status === false && (
                      <Task
                        key={task.id}
                        task={task}
                        changeStatus={handleStatusChange}
                      />
                    )
                )}
              </>
            )}

            {tasks.length > 0 && (
              <>
                <Text style={styles.listTitle}>Done</Text>
                {tasks.map(
                  (task) =>
                    task.status === true && (
                      <Task
                        key={task.id}
                        task={task}
                        changeStatus={handleStatusChange}
                      />
                    )
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  addTask: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e6e6e6",
  },
  scrollView: {
    height: "80%",
  },
  tasks: {
    // marginTop: 20,
    gap: 10,
  },
});

export default Index;
