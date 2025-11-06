import Animated from 'react-native-reanimated';
import { ImageSourcePropType, View } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={{ top: -350 }}>
      <Animated.Image
        source={stickerSource}
        resizeMode={"contain"}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}
