import { TaskClass } from "@/constants/Types";
import React, { ComponentProps } from "react";
import { Modal, StyleSheet, View, Text } from "react-native";

type AddModalProps = ComponentProps<typeof View> & {
  task?: TaskClass;
};

const AddModal = ({ task, ...props }: AddModalProps) => {
  return (
    <View>
      <Modal visible={true} animationType="slide">
        <View style={styles.modal}>
          <Text>Add Task</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddModal;
