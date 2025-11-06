import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Button from "../components/button";
import CircleButton from "../components/CircleButton";
import IconButton from "../components/IconButton";
import ImageViwer from "../components/ImageViewer";
import EmojiPicker from "../components/EmojiPicker";
import EmojiList from "../components/EmojiList";
import EmojiSticker from "../components/EmojiSticker";

const placeHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined)

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["livePhotos"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("Selecione alguma imagem!");
    }
  }

  function onReset() {
    setShowAppOptions(false);
    setSelectedImage(undefined)
    setPickedEmoji(undefined)
  }

  function onAddStick() {
    setIsModalVisible(true)
  }
  function onModalClose(){
    setIsModalVisible(false)
  }
  async function onSaveImageAsync() {}

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViwer
          imgSource={placeHolderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton onPress={onReset} icon="refresh" label="Reset" />
            <CircleButton onPress={onAddStick} />
              <IconButton onPress={onSaveImageAsync} icon="save-alt" label="Save" />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Escolha uma foto"
            theme="primary"
            onPress={pickImage}
          />
          <Button
            label="Use esta foto"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
  },

  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 60
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: 'center'
  },
});
