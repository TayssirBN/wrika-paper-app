import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Modal, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter, Plus, X, MapPin, DollarSign, FileText, BookOpen, Package, Newspaper, Coffee, Box, ArrowLeft, Sparkles } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { LebibButton } from "@/components/LebibButton";

const { width } = Dimensions.get('window');

type CategoryType = "Documents" | "Books" | "Newspapers" | "Box Paper" | "Packaging" | "Crafts" | "Drink Cups";

interface Listing {
  id: string;
  title: string;
  type: string;
  price: string;
  location: string;
  image: string;
}

interface MaterialCategory {
  id: string;
  name: CategoryType;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const categories: MaterialCategory[] = [
  {
    id: "1",
    name: "Documents",
    icon: <FileText color={Colors.primary} size={32} />,
    color: Colors.primary,
    description: "Office papers, receipts, notes",
  },
  {
    id: "2",
    name: "Books",
    icon: <BookOpen color="#FF6B6B" size={32} />,
    color: "#FF6B6B",
    description: "Textbooks, novels, magazines",
  },
  {
    id: "3",
    name: "Newspapers",
    icon: <Newspaper color="#4ECDC4" size={32} />,
    color: "#4ECDC4",
    description: "Daily news, periodicals",
  },
  {
    id: "4",
    name: "Box Paper",
    icon: <Box color="#FFB84D" size={32} />,
    color: "#FFB84D",
    description: "Cardboard boxes, containers",
  },
  {
    id: "5",
    name: "Packaging",
    icon: <Package color="#A78BFA" size={32} />,
    color: "#A78BFA",
    description: "Wrapping paper, gift bags",
  },
  {
    id: "6",
    name: "Crafts",
    icon: <Sparkles color="#FB7185" size={32} />,
    color: "#FB7185",
    description: "Art supplies, craft paper",
  },
  {
    id: "7",
    name: "Drink Cups",
    icon: <Coffee color="#34D399" size={32} />,
    color: "#34D399",
    description: "Paper cups, disposable items",
  },
];

const mockListings: Listing[] = [
  {
    id: "1",
    title: "Old School Textbooks",
    type: "Books",
    price: "25TND",
    location: "2.5 km away",
    image: "https://i0.wp.com/www.jeune-independant.net/wp-content/uploads/2021/09/Cherche-livres-scolaires-desesperement.jpg?w=350",
  },
  {
    id: "2",
    title: "Office Paper Bundle",
    type: "Documents",
    price: "70TND",
    location: "1.2 km away",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadDdW-25q6lTNKzUwEPy7flQt9fllC_56vaLd0ty0IDDsHk9lpfGLCN-_4D-lnsQA3Dg&usqp=CAU",
  },
  {
    id: "3",
    title: "Moving Boxes",
    type: "Box Paper",
    price: "$20",
    location: "3.8 km away",
    image: "https://gcb.com.my/wp-content/uploads/2023/04/08-Types-of-Carton-Box-Design.webp",
  },
  {
    id: "4",
    title: "Daily Newspapers Stack",
    type: "Newspapers",
    price: "$10",
    location: "4.1 km away",
    image: "https://www.shutterstock.com/image-photo/tunis-tunisia-012020-famous-tunisian-600w-1649293750.jpg",
  },
  {
    id: "5",
    title: "Disposable Paper Cups (100pcs)",
    type: "Drink Cups",
    price: "$8",
    location: "1.8 km away",
    image: "https://packadi.be/706-large_default/gobelet-a-cafe-en-carton-80mm-240ml-noir-100-pieces.jpg",
  },
  {
    id: "6",
    title: "Shipping Boxes Set",
    type: "Box Paper",
    price: "$25",
    location: "2.2 km away",
    image: "https://m.media-amazon.com/images/I/71m3sK0Tf3L.jpg",
  },
  {
    id: "7",
    title: "Colorful Craft Paper",
    type: "Crafts",
    price: "$12",
    location: "3.1 km away",
    image: "https://4.imimg.com/data4/EW/PT/MY-20285367/crafts-paper-500x500.jpg",
  },
  {
    id: "8",
    title: "Gift Wrapping Paper Rolls",
    type: "Packaging",
    price: "$7",
    location: "1.5 km away",
    image: "https://m.media-amazon.com/images/I/61GvDgtMtsL.jpg",
  },
  {
    id: "9",
    title: "Eco Paper Bags Bundle",
    type: "Packaging",
    price: "$7",
    location: "2.8 km away",
    image: "https://i5.walmartimages.com/seo/50-Pack-Small-Kraft-Paper-Gift-Bags-with-Handles-Brown-Shopping-Bag-Bulk-for-Birthday-Wedding-Party-Favor-6-x-5-x-2-5-in_81d89a28-c1fe-4c59-9fc6-28c5459880f7.fa2a6464f3335780acdfc9f4ef8b0013.jpeg",
  },
  {
    id: "10",
    title: "Vintage Novel Collection",
    type: "Books",
    price: "70TND",
    location: "4.5 km away",
    image: "https://i.etsystatic.com/16895790/r/il/a289d9/4841007885/il_1080xN.4841007885_potp.jpg",
  },
  {
    id: "11",
    title: "Office Documents Archive",
    type: "Documents",
    price: "30TND",
    location: "0.8 km away",
    image: "https://www.homestore.me.uk/wp-content/uploads/2020/07/scrap-2049626_640.jpg",
  },
  {
    id: "12",
    title: "Pizza Boxes (Clean)",
    type: "Box Paper",
    price: "$4",
    location: "1.1 km away",
    image: "https://ae01.alicdn.com/kf/S043d4621ef4d41ee95937576f6651b7aH.jpg?width=790&height=1000&hash=1790",
  },
  {
    id: "13",
    title: "Newspaper Collection",
    type: "Newspapers",
    price: "12TND",
    location: "0.5 km away",
    image: "https://www.kget.com/wp-content/uploads/sites/2/2023/08/64c965f6cc1e76.65205245.jpeg?w=2560&h=1440&crop=1",
  },
  {
    id: "14",
    title: "Coffee Cup Collection",
    type: "Drink Cups",
    price: "15TND",
    location: "2.0 km away",
    image: "https://m.media-amazon.com/images/I/71YLHuC2gqL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: "15",
    title: "Small Gift Boxes",
    type: "Box Paper",
    price: "30TND",
    location: "3.2 km away",
    image: "https://m.media-amazon.com/images/I/615EgNo17gL.jpg",
  },
  {
    id: "16",
    title: "Art Scrapbook Paper",
    type: "Crafts",
    price: "$9",
    location: "2.7 km away",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
  },
  {
    id: "17",
    title: "Comic Book Collection",
    type: "Books",
    price: "$25",
    location: "3.5 km away",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400",
  },
  {
    id: "18",
    title: "Tea Cup Sleeves",
    type: "Drink Cups",
    price: "$4",
    location: "1.3 km away",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
  },
  {
    id: "19",
    title: "Origami Paper Set",
    type: "Crafts",
    price: "$11",
    location: "2.1 km away",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
  },
  {
    id: "20",
    title: "Shipping Envelopes",
    type: "Packaging",
    price: "$8",
    location: "1.9 km away",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400",
  },
];

export default function HubScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<string>("All");
  const [distanceFilter, setDistanceFilter] = useState<string>("All");

  const filteredListings = mockListings.filter((listing) => {
    const matchesCategory = !selectedCategory || listing.type === selectedCategory;
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter === "All" || 
      (priceFilter === "Low" && parseInt(listing.price.replace('$', '')) < 10) ||
      (priceFilter === "Medium" && parseInt(listing.price.replace('$', '')) >= 10 && parseInt(listing.price.replace('$', '')) < 20) ||
      (priceFilter === "High" && parseInt(listing.price.replace('$', '')) >= 20);
    const matchesDistance = distanceFilter === "All" ||
      (distanceFilter === "Near" && parseFloat(listing.location) < 2) ||
      (distanceFilter === "Medium" && parseFloat(listing.location) >= 2 && parseFloat(listing.location) < 4) ||
      (distanceFilter === "Far" && parseFloat(listing.location) >= 4);
    return matchesCategory && matchesSearch && matchesPrice && matchesDistance;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          {selectedCategory && (
            <TouchableOpacity 
              style={styles.backButtonHeader}
              onPress={() => setSelectedCategory(null)}
            >
              <ArrowLeft color={Colors.primary} size={24} />
            </TouchableOpacity>
          )}
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {selectedCategory ? selectedCategory : "Paper Hub"}
            </Text>
            <Text style={styles.subtitle}>
              {selectedCategory 
                ? "Browse and trade " + selectedCategory.toLowerCase() 
                : "Select a material category"}
            </Text>
          </View>
        </View>

        {selectedCategory && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search color={Colors.text.secondary} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search in this category..."
                placeholderTextColor={Colors.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
              <Filter color={Colors.primary} size={20} />
            </TouchableOpacity>
          </View>
        )}

        {!selectedCategory ? (
          <ScrollView
            style={styles.categoriesScrollContainer}
            contentContainerStyle={styles.categoriesGrid}
            showsVerticalScrollIndicator={false}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category.name)}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}15` }]}>
                  {category.icon}
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.listingsContainer}
            contentContainerStyle={styles.listingsContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredListings.map((listing) => (
              <TouchableOpacity key={listing.id} style={styles.listingCard}>
                <Image source={{ uri: listing.image }} style={styles.listingImage} />
                <View style={styles.listingInfo}>
                  <Text style={styles.listingTitle} numberOfLines={1}>{listing.title}</Text>
                  <Text style={styles.listingType}>{listing.type}</Text>
                  <View style={styles.listingFooter}>
                    <Text style={styles.listingPrice}>{listing.price}</Text>
                    <Text style={styles.listingLocation} numberOfLines={1}>{listing.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <LebibButton />
        <TouchableOpacity style={styles.fab} onPress={() => setShowAddModal(true)}>
          <Plus color={Colors.white} size={24} />
        </TouchableOpacity>
      </SafeAreaView>

      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowFilterModal(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X color={Colors.text.primary} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Price Range</Text>
              <View style={styles.filterOptions}>
                {["All", "Low", "Medium", "High"].map((price) => (
                  <TouchableOpacity
                    key={price}
                    style={[
                      styles.filterOption,
                      priceFilter === price && styles.filterOptionActive,
                    ]}
                    onPress={() => setPriceFilter(price)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        priceFilter === price && styles.filterOptionTextActive,
                      ]}
                    >
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Distance</Text>
              <View style={styles.filterOptions}>
                {["All", "Near", "Medium", "Far"].map((distance) => (
                  <TouchableOpacity
                    key={distance}
                    style={[
                      styles.filterOption,
                      distanceFilter === distance && styles.filterOptionActive,
                    ]}
                    onPress={() => setDistanceFilter(distance)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        distanceFilter === distance && styles.filterOptionTextActive,
                      ]}
                    >
                      {distance}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowAddModal(false)}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Announcement</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X color={Colors.text.primary} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Old School Books"
                  placeholderTextColor={Colors.text.tertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categoryGrid}>
                  {categories.map((category) => (
                    <TouchableOpacity key={category.id} style={styles.categoryChip}>
                      <Text style={styles.categoryChipText}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Price</Text>
                <View style={styles.priceInput}>
                  <DollarSign color={Colors.text.secondary} size={20} />
                  <TextInput
                    style={styles.priceTextInput}
                    placeholder="0"
                    placeholderTextColor={Colors.text.tertiary}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location</Text>
                <View style={styles.locationInput}>
                  <MapPin color={Colors.text.secondary} size={20} />
                  <TextInput
                    style={styles.locationTextInput}
                    placeholder="Distance in km"
                    placeholderTextColor={Colors.text.tertiary}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.addPhotoButton}>
                <Plus color={Colors.primary} size={24} />
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Post Announcement</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backButtonHeader: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerContent: {
    flex: 1,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoriesScrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: (width - 56) / 2,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.success,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  categoryIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  listingsContainer: {
    flex: 1,
    marginTop: 20,
  },
  listingsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  listingCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.success,
    flexDirection: 'row',
    height: 110,
  },
  listingImage: {
    width: 110,
    height: '100%',
    backgroundColor: Colors.border,
  },
  listingInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  listingType: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  listingLocation: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  filterOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  filterOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  filterOptionTextActive: {
    color: Colors.white,
  },
  applyButton: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  locationTextInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.success,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addPhotoText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
