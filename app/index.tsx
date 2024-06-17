import Task from "@/components/ToDo/Task";
import { TaskClass } from "@/constants/Types";
import useTaskList from "@/hooks/useTaskList";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const segments = useSegments();
  const [loading, setLoading] = useState(false);

  const { tasks, handleStatusChange, deleteTask, refreshTasks } = useTaskList();

  const handleRefresh = () => {
    refreshTasks().then(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    refreshTasks().then(() => setLoading(false));
  }, [segments]);

  const handleAddTaskClick = () => {
    // console.log("Add task");
    router.push("addTask");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tasks</Text>
          <TouchableHighlight
            onPress={handleAddTaskClick}
            style={styles.addTask}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableHighlight>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
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
                        deleteTask={deleteTask}
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
                        deleteTask={deleteTask}
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
    marginBottom: 200,
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
    height: "100%",
  },
  tasks: {
    // marginTop: 20,
    gap: 10,
  },
});

export default Index;
