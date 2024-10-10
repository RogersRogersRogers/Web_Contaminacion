package com.example.p_biometra;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class RetrofitClient {


    private static Retrofit retrofit = null;


    public static ApiService getApiService() {
        if (retrofit == null) {
            // Construye la instancia de Retrofit con la URL base y el convertidor Gson
            retrofit = new Retrofit.Builder()
                    .baseUrl("http://192.168.1.26:3000/") // Cambia la IP por la de tu servidor
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        // Retorna la instancia de ApiService creada a partir de Retrofit
        return retrofit.create(ApiService.class);
    }
}