package com.example.demo.dto;

public class ProfileUpdateRequest {

    private String fullName;
    private String email;
    private String phone;

    private Double minBudget;
    private Double maxBudget;

    private String preferredLocality;
    private String preferredPropertyType;
    private String preferredTransactionType;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getMinBudget() {
        return minBudget;
    }

    public void setMinBudget(Double minBudget) {
        this.minBudget = minBudget;
    }

    public Double getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(Double maxBudget) {
        this.maxBudget = maxBudget;
    }

    public String getPreferredLocality() {
        return preferredLocality;
    }

    public void setPreferredLocality(String preferredLocality) {
        this.preferredLocality = preferredLocality;
    }

    public String getPreferredPropertyType() {
        return preferredPropertyType;
    }

    public void setPreferredPropertyType(String preferredPropertyType) {
        this.preferredPropertyType = preferredPropertyType;
    }

    public String getPreferredTransactionType() {
        return preferredTransactionType;
    }

    public void setPreferredTransactionType(String preferredTransactionType) {
        this.preferredTransactionType = preferredTransactionType;
    }
}