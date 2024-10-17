import RideCard from '@/app/components/RideCard'
import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { icons, images } from '@/constants'
import GoogleTextInput from '@/app/components/GoogleTextInput';
import Map from '@/app/components/Map'
import { useLocationStore } from '@/app/store'
import { useEffect, useState } from 'react'
import * as Location from "expo-location";
import { useFetch } from '@/lib/fetch'
import { Ride } from '@/types/type'




export default function Page() {
  const { user } = useUser()
  const { signOut } = useAuth();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
 const [hasPermission, setHasPermission] = useState<boolean>(false);
 const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
}
const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  }

useEffect(() => {
const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        setHasPermission(false);
        return;
    }


let location = await Location.getCurrentPositionAsync();

const address = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
});

setUserLocation({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    address: `${address[0].name}, ${address[0].region}`,
});
}

requestLocation()
}, [])

  return (
    <GestureHandlerRootView>
   <SafeAreaView className ="bg-general-500">
    <FlatList
data={recentRides?.slice(0, 5)}/* {recentRides?.slice(0, 5)} */
renderItem={({ item }) => <RideCard ride ={item} />}
keyExtractor={(item, index) => index.toString()}
className="px-5 font-md"
keyboardShouldPersistTaps="handled"
contentContainerStyle={{
  paddingBottom: 100,
}}
ListEmptyComponent={() => (
    <View className="flex flex-col items-center justify-center">
        {!loading ? (
            <>
            <Image source={images.noResult}
            className="w-40 h-40"
            alt="No recent rides found"
            resizeMode="contain"
            />
             <Text className="text-sm">No recent rides found</Text>
            </>
        ) : (
            <Image source={images.loadState}
            className="w-45 h-40 mt-5"
            alt="No recent rides found"
            resizeMode="contain"/>
           
            /*  <ActivityIndicator size="small" color="#000" /> */
        )}
  {/* <Text className="text-sm">No recent rides found</Text> */}
</View>

)}
ListHeaderComponent={(
    <>
    <View className="flex flex-row items-center justify-between my-5">
        <Text className="text-1xl font-JakartaExtraBold">Welcome {user?.emailAddresses[0].emailAddress}</Text>
    <TouchableOpacity onPress={handleSignOut} className="justify-center items-center w-10 h-10 rounded-full bg-white">
    <Image source={icons.out} className="w-4 h-4" />
    </TouchableOpacity>
    </View>

    <GoogleTextInput
    icon={icons.search}
    containerStyle="bg-white shadow-md shadow-neutral-300"
    handlePress={handleDestinationPress}
    />
    <>
    <Text className="text-xl font-JakartaBold mt-5 mb-3">
    Your current location
    </Text>
    <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
    </>
    <Text className="text-md font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
    </>
)}


/>
   </SafeAreaView>
   </GestureHandlerRootView>
  )
}