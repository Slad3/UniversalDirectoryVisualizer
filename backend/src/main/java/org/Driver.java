package org;

import org.json.JSONObject;

import java.io.File;
import java.io.FileFilter;

public class Driver {

    private String url;

    public Driver(String url) {
        this.url = url;
    }


    // Will later return a JSON object
    public void parse() {
        parseDirectory(this.url);
    }

    // Will later return a JSON object
    public void parseDirectory(String directory) {


        File[] directories = findDirectories(new File(directory));
        File[] files = findFiles(new File(directory));

        for (File f : directories) {
            System.out.println(f);
            System.out.println(f.length());

//            try {
////                parseDirectory(f.getAbsolutePath());
//            } catch (Exception e) {
//                System.err.println(f.getAbsolutePath());
////                e.printStackTrace();
//            }
        }

        for(File f: files){
            System.out.println(f + "\t" + f.length());
        }


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
