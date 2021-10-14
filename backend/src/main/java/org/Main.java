package org;

/**
 * Quick Jooby start up guide
 * All Official documentation can be found here: https://jooby.io/
 */

import io.jooby.*;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

/**
 * I should also mention that the official documentation has the main class extend Jooby
 * That works for testing, but if you're trying to package it as a jar, you're gonna have a bad time
 */
public class Main {

    public static void main(String [] args){

        Jooby app = new Jooby();

        /**
        * Setting properties for the jooby server
        * .setPort will denote which port the app will listen to (ipAddress:8080)
        * Only one application can listen to a port at the same time
        * If you're doing a custom port, you can use almost any port 10 - 9999
        * Except 80, 443, which are reserved for the default http:// and https:// respectfully
         */
        app.setServerOptions(new ServerOptions()
                .setPort(18989)
        );
        app.decorator(new CorsHandler());
        /**
        * Index route
        * This is the route that is initially routed to when
        * The "/" is the routing pattern which denotes which route the user is connecting to
         */
        app.get("/", ctx -> {

            // If you want to return a file, make sure you denote the file type, or just plain "file"
            ctx.setResponseType(MediaType.html);

            Map<String, String> dictionary = new HashMap<>();
            dictionary.put("Backend Working update", "true");

            ctx.setResponseType(MediaType.json);
            return new JSONObject(dictionary);
        });

        app.get("/parseDirectory/{directory}", ctx -> {
            ctx.setResponseType(MediaType.json);
            return new JSONObject(new Driver(ctx.path("directory").value()).parse());
        });

        app.get("/test", ctx -> {
            ctx.setResponseType(MediaType.json);
            return new JSONObject(new Driver(".").parse());
        });

        /**
         * Post and getting data from a form example
         */
        app.post("/post", ctx ->{
            String formPost = ctx.form("textBox").value();
            System.out.println(formPost);
            return formPost;
        });


        app.start();

        System.out.println("Backend Started");
    }
}
