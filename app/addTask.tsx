import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Switch,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  const handleAddTaskClick = () => {
    if (title.trim() === "") {
        Alert.alert("Title is required");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formField}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />
      </View>
      <View style={styles.formField}>
        <Text style={styles.label}>Status</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Switch value={status} onValueChange={setStatus} />
          <Text>{status ? "Done" : "Due"}</Text>
        </View>
      </View>

      <TouchableHighlight style={styles.button} onPress={handleAddTaskClick}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.buttonText}>Add Task</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0081e3",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default AddTask;