// Track searches made by a user
import {Client, Databases, ID, Query} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!

const client = new Client().setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

//Database instance
const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
 try{
     const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
         Query.equal('searchTerm', query),
     ])

     console.log(result)

     if (result.documents.length > 0) {
         const existingMovie = result.documents[0]

         await database.updateDocument(
             DATABASE_ID,
             TABLE_ID,
             existingMovie.$id,
             {
                 count: existingMovie.count + 1
             }
         )
     } else {
         await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
             title:movie.title,
             searchTerm: query,
             movie_id: movie.id,
             count: 1,
             poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
         })
     }
 } catch (error) {
     console.log(error);
     throw error;
 }
    // Check if a record of that search has been stored
    // If a document is found, increment the searchCount field
}