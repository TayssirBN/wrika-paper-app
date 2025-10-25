import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sprout, Droplets, Leaf, Recycle, Package, Trees, Trash2, X, Star } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { LebibButton } from "@/components/LebibButton";

type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceUnit: string;
  image: string;
  icon: any;
  description: string;
  features: { icon: any; title: string; desc: string }[];
  rating: number;
  reviews: number;
};

const products: Product[] = [
  {
    id: '1',
    name: 'Paper Seed Pens',
    tagline: 'Write, plant, and grow life',
    price: '6.99TND',
    priceUnit: 'per pack of 5',
    image: 'https://m.media-amazon.com/images/I/81I37D3EkRL._AC_SL1500_.jpg',
    icon: Sprout,
    description: 'Eco-friendly pens made from recycled paper with seed capsules inside. Plant them after use and watch herbs or flowers grow.',
    features: [
      { icon: Leaf, title: 'Recycled Paper', desc: 'Made from 100% recycled materials' },
      { icon: Sprout, title: 'Seed Capsule', desc: 'Grows herbs or flowers after use' },
      { icon: Droplets, title: 'Biodegradable', desc: 'Completely eco-friendly material' },
    ],
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Paperwall',
    tagline: 'Transform paper waste into eco-insulation',
    price: '9.99TND',
    priceUnit: 'per 1m²',
    image: 'https://www.matrec.com/wp-content/uploads/2013/12/matrec_rpap16384.jpg',
    icon: Package,
    description: 'Revolutionary wall insulation made from recycled paper. Soundproof, fireproof, and eco-friendly solution for your home.',
    features: [
      { icon: Recycle, title: 'Recycled Material', desc: 'Made from 100% recycled paper' },
      { icon: Leaf, title: 'Energy Efficient', desc: 'Reduces heating & cooling costs' },
      { icon: Package, title: 'Easy Installation', desc: 'DIY-friendly and lightweight' },
    ],
    rating: 4.6,
    reviews: 187,
  },
  {
    id: '3',
    name: 'Tree Compost',
    tagline: 'compost made by paper',
    price: '7.99TND',
    priceUnit: 'per 10kg bag',
    image: 'https://i0.wp.com/www.valleygardens.com/blog/wp-content/uploads/2019/11/img_0643-e1574018257528.jpg?ssl=1',
    icon: Trees,
    description: 'Premium compost made from composted paper waste. Perfect for growing trees and plants with essential nutrients.',
    features: [
      { icon: Trees, title: 'Rich in Nutrients', desc: 'Perfect for growing healthy trees' },
      { icon: Leaf, title: 'Organic & Natural', desc: 'No chemicals or additives' },
      { icon: Recycle, title: 'Waste Reduction', desc: 'Transforms paper waste into life' },
    ],
    rating: 4.9,
    reviews: 412,
  },
  {
    id: '4',
    name: 'Smart Bin Capture',
    tagline: 'AI-powered waste sorting system',
    price: '1899.99TND',
    priceUnit: 'per unit',
    image: 'https://www.techni-contact.com/ressources/images/produits/zoom/poubelle-intelligente-tri-selectif-74914459-1.jpg',
    icon: Trash2,
    description: 'Intelligent bin with AI camera that automatically sorts garbage by type. Makes recycling effortless and accurate.',
    features: [
      { icon: Trash2, title: 'Auto-Sorting', desc: 'AI identifies and sorts waste types' },
      { icon: Recycle, title: 'Smart Alerts', desc: 'Notifies when bins need emptying' },
      { icon: Leaf, title: 'Eco Analytics', desc: 'Track your recycling impact' },
    ],
    rating: 4.7,
    reviews: 156,
  },
];

export default function MarketplaceScreen() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Eco Marketplace</Text>
            <Text style={styles.subtitle}>Sustainable products for a better planet 🌍</Text>
          </View>

          <View style={styles.productsGrid}>
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => setSelectedProduct(product)}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  
                  <View style={styles.productIconBadge}>
                    <IconComponent color={Colors.primary} size={24} />
                  </View>

                  <View style={styles.productContent}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productTagline} numberOfLines={2}>
                      {product.tagline}
                    </Text>
                    
                    <View style={styles.productFooter}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        <Text style={styles.productPriceUnit} numberOfLines={1}>{product.priceUnit}</Text>
                      </View>
                      
                      <View style={styles.ratingBadge}>
                        <Star color="#FFD700" fill="#FFD700" size={14} />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <Modal
          visible={selectedProduct !== null}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedProduct(null)}
        >
          {selectedProduct && (
            <View style={styles.modalContainer}>
              <SafeAreaView edges={['top', 'bottom']} style={styles.modalSafeArea}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={() => setSelectedProduct(null)}
                      style={styles.closeButton}
                    >
                      <X color={Colors.text.primary} size={28} />
                    </TouchableOpacity>
                  </View>

                  <Image
                    source={{ uri: selectedProduct.image }}
                    style={styles.modalImage}
                  />

                  <View style={styles.modalContent}>
                    <View style={styles.modalIconBadge}>
                      <selectedProduct.icon color={Colors.primary} size={32} />
                    </View>

                    <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                    <Text style={styles.modalTagline}>{selectedProduct.tagline}</Text>

                    <View style={styles.modalPriceSection}>
                      <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                      <Text style={styles.modalPriceUnit}>{selectedProduct.priceUnit}</Text>
                    </View>

                    <View style={styles.modalRating}>
                      <View style={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            color="#FFD700"
                            fill={i < Math.floor(selectedProduct.rating) ? "#FFD700" : "transparent"}
                            size={20}
                          />
                        ))}
                      </View>
                      <Text style={styles.modalRatingText}>
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </Text>
                    </View>

                    <Text style={styles.modalDescription}>{selectedProduct.description}</Text>

                    <View style={styles.featuresSection}>
                      <Text style={styles.featuresTitle}>Key Features</Text>
                      {selectedProduct.features.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <View key={index} style={styles.featureCard}>
                            <View style={styles.featureIcon}>
                              <FeatureIcon color={Colors.primary} size={22} />
                            </View>
                            <View style={styles.featureText}>
                              <Text style={styles.featureTitle}>{feature.title}</Text>
                              <Text style={styles.featureDesc}>{feature.desc}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>

                    <TouchableOpacity style={styles.buyNowButton}>
                      <Text style={styles.buyNowText}>Buy Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.learnMoreButton}>
                      <Text style={styles.learnMoreText}>Learn How It&apos;s Made</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          )}
        </Modal>

        <LebibButton />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  productsGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.success,
    overflow: 'hidden',
    marginBottom: 0,
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.border,
  },
  productIconBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.white,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.success,
  },
  productContent: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  productTagline: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
    marginRight: 12,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  productPriceUnit: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalSafeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalImage: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.border,
  },
  modalContent: {
    padding: 20,
  },
  modalIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  modalTagline: {
    fontSize: 18,
    color: Colors.text.secondary,
    marginBottom: 20,
  },
  modalPriceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  modalPriceUnit: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
  },
  modalRatingText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
    marginBottom: 28,
  },
  featuresSection: {
    marginBottom: 28,
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  buyNowButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buyNowText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  learnMoreButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.success,
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
});
