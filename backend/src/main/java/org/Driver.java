package org;

import org.json.JSONObject;

import java.io.File;
import java.io.FileFilter;
import java.util.HashMap;
import java.util.Map;

public class Driver {
    private final String url;

    /**
     * Constructor for direcotry parsing driver
     * 
     * @param url - Path of directory to parse
     */
    public Driver(String url) {
        this.url = url;
    }

    /**
     * Wrapper function for parseDirectory in case more functionality is requried in
     * the future
     * 
     * @return HashMap - The nested HashMap representation of the parsed directory
     */
    // Will later return a JSON object
    public HashMap parse() {
        try {
            return parseDirectory(this.url);
        } catch (Exception e) {
            System.err.println(this.url + " does not exist!");
        }
        return null;
    }

    /**
     * Function to parse a given directory and compress the data into a nested
     * HashMap containing all
     * subdirectories/folder/files as well as the sizes for each item parsed
     * 
     * @param directory - The path of the directory to be parsed
     * @return HashMap - The nested HashMap representation of the parsed directory
     */
    public HashMap parseDirectory(String directory) {

        // Data structures to hold the files and directories that java gives us from the
        // backend
        File[] directories = findDirectories(new File(directory));
        File[] files = findFiles(new File(directory));

        // Data structures to be returned so JSON dependency can format into JSON
        HashMap<String, HashMap> directoryDict = new HashMap<>();
        HashMap<String, Long> fileDict = new HashMap<>();

        // Loop through directories and recursively go through children directories
        // Will just skip specific directories if any errors of opening directories
        for (File f : directories) {
            try {
                // Subdirectories are put into
                directoryDict.put(f.getName(), parseDirectory(f.getAbsolutePath()));
            } catch (Exception e) {
                System.err.println(f.getAbsolutePath());
                // e.printStackTrace();
            }
        }

        // Total size of current file directory
        long totalSize = 0;

        // File loop, gets file size and adds file name and length to Hash
        for (File f : files) {
            totalSize += f.length();
            fileDict.put(f.getName(), f.length());
        }

        // Looping through subdirectories and adding size for total size
        for (HashMap.Entry<String, HashMap> hm : directoryDict.entrySet()) {
            totalSize += new Long((String) ((HashMap) hm.getValue().get("::meta::")).get("size"));
        }

        // Adding meta information to current folder
        HashMap<String, String> meta = new HashMap<String, String>();
        meta.put("size", String.valueOf(totalSize));
        meta.put("htmlId", "files" + Math.random() * 900000);
        directoryDict.put("::meta::", meta);

        directoryDict.put("::files::", fileDict);

        return directoryDict;
    }

    /**
     * Function to find all subdirectories/folders in a root directory
     * 
     * @param root - The directory to find files in
     * @return File[] - Array of all files in the root
     */
    // Function to return just the directories
    public File[] findDirectories(File root) {
        return root.listFiles(new FileFilter() {
            public boolean accept(File f) {
                return f.isDirectory();
            }
        });
    }

    /**
     * Function to find all files in a given root directory/folder
     * 
     * @param root - The directory to find subdirectories in
     * @return File[] - Array of all subdirectories in the root
     */
    // Function to return just the files
    public File[] findFiles(File root) {
        return root.listFiles(new FileFilter() {
            public boolean accept(File f) {
                return f.isFile();
            }
        });
    }

}
