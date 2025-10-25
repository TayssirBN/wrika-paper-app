import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Navigation, Trash2, MapPin } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { LebibButton } from "@/components/LebibButton";

interface Bin {
  id: string;
  lat: number;
  lng: number;
  status: "empty" | "full" | "inProgress";
  name: string;
  distance: string;
  lastCollection: string;
  fillPercentage: number;
}

const mockBins: Bin[] = [
  {
    id: "1",
    lat: 36.8065,
    lng: 10.1815,
    status: "empty",
    name: "Main Street Recycling Center",
    distance: "0.5 km",
    lastCollection: "2h ago",
    fillPercentage: 15,
  },
  {
    id: "2",
    lat: 36.8105,
    lng: 10.1855,
    status: "full",
    name: "Park Avenue Collection Point",
    distance: "1.2 km",
    lastCollection: "5h ago",
    fillPercentage: 95,
  },
  {
    id: "3",
    lat: 36.8025,
    lng: 10.1775,
    status: "inProgress",
    name: "Downtown Eco Hub",
    distance: "2.1 km",
    lastCollection: "30m ago",
    fillPercentage: 65,
  },
  {
    id: "4",
    lat: 36.8145,
    lng: 10.1895,
    status: "empty",
    name: "Harbor Side Recycling",
    distance: "3.5 km",
    lastCollection: "1h ago",
    fillPercentage: 20,
  },
  {
    id: "5",
    lat: 36.8185,
    lng: 10.1935,
    status: "full",
    name: "University Campus Collection",
    distance: "4.2 km",
    lastCollection: "8h ago",
    fillPercentage: 92,
  },
  {
    id: "6",
    lat: 36.7985,
    lng: 10.1735,
    status: "empty",
    name: "Central Market Recycling",
    distance: "0.8 km",
    lastCollection: "3h ago",
    fillPercentage: 10,
  },
  {
    id: "7",
    lat: 36.8225,
    lng: 10.1975,
    status: "inProgress",
    name: "North District Eco Point",
    distance: "5.5 km",
    lastCollection: "1h ago",
    fillPercentage: 58,
  },
];

export default function MapScreen() {
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const mapRef = useRef<MapView>(null);

  const getBinColor = (status: Bin["status"]) => {
    switch (status) {
      case "empty":
        return Colors.mapBin.empty;
      case "full":
        return Colors.mapBin.full;
      case "inProgress":
        return Colors.mapBin.inProgress;
    }
  };



  const handleMarkerPress = (bin: Bin) => {
    setSelectedBin(bin);
    mapRef.current?.animateToRegion({
      latitude: bin.lat,
      longitude: bin.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    }, 500);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_DEFAULT : undefined}
        initialRegion={{
          latitude: 36.8065,
          longitude: 10.1815,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {mockBins.map((bin) => (
          <Marker
            key={bin.id}
            coordinate={{ latitude: bin.lat, longitude: bin.lng }}
            onPress={() => handleMarkerPress(bin)}
          >
            <View style={[styles.customMarker, { backgroundColor: getBinColor(bin.status) }]}>
              <Trash2 color={Colors.white} size={20} />
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedBin && (
        <View style={styles.popupOverlay}>
          <TouchableOpacity 
            style={styles.popupBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedBin(null)}
          />
          <View style={styles.popup}>
            <View style={styles.popupHeader}>
              <View style={[styles.binStatusDot, { backgroundColor: getBinColor(selectedBin.status) }]} />
              <Text style={styles.popupTitle}>{selectedBin.name}</Text>
              <TouchableOpacity 
                onPress={() => setSelectedBin(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.popupContent}>
              <View style={styles.fillContainer}>
                <View style={styles.fillHeader}>
                  <Text style={styles.fillLabel}>Fill Level</Text>
                  <Text style={styles.fillPercentage}>{selectedBin.fillPercentage}%</Text>
                </View>
                <View style={styles.fillBarBg}>
                  <View 
                    style={[
                      styles.fillBarFg, 
                      { 
                        width: `${selectedBin.fillPercentage}%`,
                        backgroundColor: getBinColor(selectedBin.status),
                      }
                    ]} 
                  />
                </View>
              </View>

              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <MapPin color={Colors.primary} size={20} />
                  <Text style={styles.infoLabel}>Distance</Text>
                  <Text style={styles.infoValue}>{selectedBin.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Trash2 color={Colors.primary} size={20} />
                  <Text style={styles.infoLabel}>Last Collected</Text>
                  <Text style={styles.infoValue}>{selectedBin.lastCollection}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.navigateButton}>
                <Navigation color={Colors.white} size={20} />
                <Text style={styles.navigateButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <LebibButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
  },
  popupBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popup: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: Colors.success,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  binStatusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  popupTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  popupContent: {
    gap: 20,
  },
  fillContainer: {
    gap: 10,
  },
  fillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fillLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  fillPercentage: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.primary,
  },
  fillBarBg: {
    height: 16,
    backgroundColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  fillBarFg: {
    height: '100%',
    borderRadius: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  navigateButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
