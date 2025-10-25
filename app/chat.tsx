import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Send, Mic, ImageIcon, Camera } from "lucide-react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/colors";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";

interface Message {
  id: string;
  text: string;
  images?: string[];
  sender: "user" | "ai";
  timestamp: Date;
}

const quickReplies = [
  "Is this recyclable?",
  "Give me reuse ideas",
  "Show eco products",
  "Find nearest bin",
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there 🌱, how can I help you save the planet today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const scrollViewRef = useRef<ScrollView>(null);
  const cameraRef = useRef<CameraView>(null);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      blinkAnim.setValue(1);
    }
  }, [isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText && selectedImages.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText || (selectedImages.length > 0 ? "📷 Is this recyclable?" : ""),
      images: selectedImages.length > 0 ? [...selectedImages] : undefined,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    const hasImages = selectedImages.length > 0;
    setSelectedImages([]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = hasImages
        ? "No, this type of paper can't be recycled. Do you wanna know why? 🤔"
        : getAiResponse(messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const handleOpenCamera = async () => {
    if (!cameraPermission) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        Alert.alert("Permission Required", "Camera permission is needed to take photos.");
        return;
      }
    }

    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        Alert.alert("Permission Required", "Camera permission is needed to take photos.");
        return;
      }
    }

    setShowCamera(true);
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setSelectedImages(prev => [...prev, photo.uri]);
        setShowCamera(false);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("recyclable")) {
      return "Great question! Most paper, cardboard, and clean newspapers are recyclable. Avoid recycling paper with food stains, wax coating, or lamination. 📄♻️";
    } else if (lowerMessage.includes("reuse")) {
      return "Here are some creative reuse ideas: Turn old newspapers into gift wrap, use cardboard boxes for storage, or create art projects with scrap paper! 🎨";
    } else if (lowerMessage.includes("product")) {
      return "Check out our eco-friendly Seed Pens in the Marketplace! They're made from recycled paper and grow plants after use. 🌱✏️";
    } else if (lowerMessage.includes("bin") || lowerMessage.includes("nearest")) {
      return "I can help you find the nearest recycling bin! Check the Map tab to see all nearby collection points. The closest one is just 0.5 km away! 🗺️";
    } else {
      return "That's interesting! I'm here to help with recycling tips, eco-product recommendations, and finding recycling centers. What would you like to know more about? 🌍";
    }
  };

  if (showCamera) {
    return (
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        >
          <SafeAreaView edges={['top', 'bottom']} style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.cameraCloseButton}
                onPress={() => setShowCamera(false)}
              >
                <X color={Colors.white} size={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={handleTakePhoto}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </CameraView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View
        style={[
          styles.background,
          {
            backgroundColor: Colors.gradient.top,
          },
        ]}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.lebibEmoji}>🤖</Text>
              <View>
                <Text style={styles.headerTitle}>Lebib AI</Text>
                <Text style={styles.headerSubtitle}>Your eco-friendly assistant</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <X color={Colors.text.primary} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageWrapper,
                  message.sender === "user"
                    ? styles.userMessageWrapper
                    : styles.aiMessageWrapper,
                ]}
              >
                {message.sender === "ai" && (
                  <Text style={styles.aiAvatarEmoji}>🤖</Text>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.aiMessage,
                  ]}
                >
                  {message.images && message.images.length > 0 && (
                    <View style={styles.messageImagesContainer}>
                      {message.images.map((imageUri, idx) => (
                        <Image
                          key={idx}
                          source={{ uri: imageUri }}
                          style={styles.messageImage}
                          resizeMode="cover"
                        />
                      ))}
                    </View>
                  )}
                  <Text
                    style={[
                      styles.messageText,
                      message.sender === "user"
                        ? styles.userMessageText
                        : styles.aiMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}

            {isTyping && (
              <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
                <Text style={styles.aiAvatarEmoji}>🤖</Text>
                <View style={[styles.messageBubble, styles.aiMessage]}>
                  <View style={styles.typingIndicator}>
                    {[0, 1, 2].map((i) => (
                      <Animated.View
                        key={i}
                        style={[
                          styles.typingDot,
                          {
                            opacity: blinkAnim,
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}

            {messages.length === 1 && (
              <View style={styles.quickRepliesContainer}>
                <Text style={styles.quickRepliesTitle}>Quick replies:</Text>
                {quickReplies.map((reply, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickReplyButton}
                    onPress={() => handleSend(reply)}
                  >
                    <Text style={styles.quickReplyText}>{reply}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            {selectedImages.length > 0 && (
              <ScrollView
                horizontal
                style={styles.selectedImagesContainer}
                showsHorizontalScrollIndicator={false}
              >
                {selectedImages.map((uri, index) => (
                  <View key={index} style={styles.selectedImageWrapper}>
                    <Image
                      source={{ uri }}
                      style={styles.selectedImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <X color={Colors.white} size={16} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
            <View style={styles.inputRow}>
              <View style={styles.inputWrapper}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handlePickImage}
                >
                  <ImageIcon color={Colors.primary} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={handleOpenCamera}
                >
                  <Camera color={Colors.primary} size={20} />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Ask me anything..."
                  placeholderTextColor={Colors.text.tertiary}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity style={styles.iconButton}>
                  <Mic color={Colors.primary} size={20} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && selectedImages.length === 0 && styles.sendButtonDisabled,
                ]}
                onPress={() => handleSend()}
                disabled={!inputText.trim() && selectedImages.length === 0}
              >
                <Send color={Colors.white} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lebibEmoji: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  aiMessageWrapper: {
    justifyContent: 'flex-start',
  },
  aiAvatarEmoji: {
    fontSize: 32,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.success,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
  aiMessageText: {
    color: Colors.text.primary,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  quickRepliesContainer: {
    marginTop: 16,
    gap: 8,
  },
  quickRepliesTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  quickReplyButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  quickReplyText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    maxHeight: 100,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  selectedImagesContainer: {
    marginBottom: 8,
  },
  selectedImageWrapper: {
    position: 'relative',
    marginRight: 8,
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cameraCloseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraControls: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  captureButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    backgroundColor: Colors.primary,
  },
});
