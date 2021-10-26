package org;

import org.json.JSONObject;

import java.io.File;
import java.io.FileFilter;
import java.util.HashMap;
import java.util.Map;


public class Driver {
    private String url;

    public Driver(String url) {
        this.url = url;
    }

    // Will later return a JSON object
    public HashMap parse() {
        return parseDirectory(this.url);
    }

    public HashMap parseDirectory(String directory) {
        File[] directories = findDirectories(new File(directory));
        File[] files = findFiles(new File(directory));

        HashMap<String, HashMap> directoryDict = new HashMap<>();
        HashMap<String, Long> fileDict = new HashMap<>();

        long totalSize = 0;

        for (File f : directories) {
            try {
                directoryDict.put(f.getName(), parseDirectory(f.getAbsolutePath()));
            } catch (Exception e) {
                System.err.println(f.getAbsolutePath());
//                e.printStackTrace();
            }
        }

        for (File f : files) {
            totalSize += f.length();
            fileDict.put(f.getName(), f.length());
        }

        for (HashMap.Entry<String, HashMap> hm : directoryDict.entrySet()) {
            totalSize += new Long((String) ((HashMap) hm.getValue().get("::meta::")).get("size"));
        }


        directoryDict.put("::files::", fileDict);

        HashMap<String, String> meta = new HashMap<String, String>();
        meta.put("size", String.valueOf(totalSize));
        meta.put("htmlId", "files" + Math.random() * 900000);


        directoryDict.put("::meta::", meta);

        return directoryDict;
    }


    public File[] findDirectories(File root) {
        return root.listFiles(new FileFilter() {
            public boolean accept(File f) {
                return f.isDirectory();
            }
        });
    }

    public File[] findFiles(File root) {
        return root.listFiles(new FileFilter() {
            public boolean accept(File f) {
                return f.isFile();
            }
        });
    }

}
