package com.example.p_biometra;

import com.example.p_biometra.POJO.Medicion;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {

    @GET("/ping")
    Call<Object> ping(); // Cambia Object a una clase específica si es necesario

    @POST("/add_data") // Asegúrate de que esta URL coincida con tu servidor
    Call<Void> insertarMedicion(@Body Medicion medicion); // Este método ahora devuelve una llamada válida
}
