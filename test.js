import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { persistor } from "./redux/store"; // Adjust if necessary

// Function to get total cache size (Redux Persist + File System)
export const getTotalCacheSize = async () => {
    try {
        // Get Redux Persist (AsyncStorage) size
        const keys = await AsyncStorage.getAllKeys();
        let reduxSize = 0;

        for (const key of keys) {
            const item = await AsyncStorage.getItem(key);
            if (item) {
                reduxSize += new Blob([item]).size;
            }
        }

        // Get File System Cache size
        const cacheDir = FileSystem.cacheDirectory;
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        let fileSize = 0;

        for (const file of files) {
            const fileInfo = await FileSystem.getInfoAsync(cacheDir + file);
            if (fileInfo.exists) {
                fileSize += fileInfo.size || 0;
            }
        }

        return ((reduxSize + fileSize) / (1024 * 1024)).toFixed(2) + " MB"; // Convert to MB
    } catch (error) {
        console.error("Error getting cache size:", error);
        return "0 MB";
    }
};

// Function to clear all cache (Redux Persist + File System)
export const clearAllCache = async () => {
    try {
        // Clear Redux Persist
        await persistor.purge();
        await AsyncStorage.clear();

        // Clear File System Cache
        const cacheDir = FileSystem.cacheDirectory;
        const files = await FileSystem.readDirectoryAsync(cacheDir);
        await Promise.all(
            files.map(file =>
                FileSystem.deleteAsync(cacheDir + file, { idempotent: true })
            )
        );

        console.log("Cache cleared successfully!");
    } catch (error) {
        console.error("Error clearing cache:", error);
    }
};
