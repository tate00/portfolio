package com.example.demo;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MetadataFetcher {

	public MetadataFetcher() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		try {
            URL url = new URL("http://localhost:8080/saml/metadata");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            StringBuilder response = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            reader.close();
            System.out.println("Metadata Response:\n" + response.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
