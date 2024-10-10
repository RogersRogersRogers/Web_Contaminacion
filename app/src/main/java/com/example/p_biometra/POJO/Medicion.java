package com.example.p_biometra.POJO;

public class Medicion {
    private String Lugar;
    private String Gas;
    private int Valor;


    public Medicion(String Lugar, String Gas, int Valor) {
        this.Lugar = Lugar;
        this.Gas = Gas;
        this.Valor = Valor;
    }


    public String getLugar() {
        return Lugar;
    }


    public void setLugar(String lugar) {
        Lugar = lugar;
    }


    public String getGas() {
        return Gas;
    }


    public void setGas(String gas) {
        Gas = gas;
    }


    public int getValor() {
        return Valor;
    }


    public void setValor(int valor) {
        Valor = valor;
    }
}