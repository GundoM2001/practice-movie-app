import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import {images} from "@/constants/images";
import MovieCard from "@/components/home_screen/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/home_screen/SearchBar";
import * as sea from "node:sea";

const Search = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('')

    const {data: movies, loading, error} = useFetch(() => fetchMovies({query: ''}), false)

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full h-full z-0" resizeMode="cover"/>
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard{...item}/>}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={
                    {
                        gap: 16,
                        marginVertical: 16
                    }
                }

                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <>
                        <View className="flex-row w-full justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>
                        <View className="my-5">
                            <SearchBar placeholder="Search movies..."/>
                        </View>

                    {loading && (<ActivityIndicator size="large" color="#0000ff" className="my-3"/>)}
                    {error && (<Text className="text-red-500 px-5 my-3">Error fetching movies</Text>)}
                    {!loading && !error && 'SEARCH TERM'.trim() && movies?.length > 0 && (
                        <Text className="text-xl text-white font-bold">Search results for {''}
                            <Text className="text-accent">
                                {searchQuery}
                            </Text>
                        </Text>)}
                    </>
                }/>
        </View>
    )
}
export default Search
