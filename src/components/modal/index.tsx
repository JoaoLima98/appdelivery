import { View, Text} from 'react-native';
import Modal from "react-native-modal";

export function WrapperComponent() {
  return (
    <View>
     <Modal isVisible={true}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}
