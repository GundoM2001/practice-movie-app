import { Image,Text, View } from "react-native";
import {images} from "@/constants/images";

export default function Index() {
  return (
  <View className="flex-1 bg-primary">
    <Image source={images.bg} className="w-full h-full" />
  </View>
  );
}
