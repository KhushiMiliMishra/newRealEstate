package com.example.demo.dto;

public class CustomerProfileResponse {

    private Double minBudget;
    private Double maxBudget;
    private String preferredLocality;
    private String preferredPropertyType;
    private String preferredTransactionType;

    public CustomerProfileResponse(
            Double minBudget,
            Double maxBudget,
            String preferredLocality,
            String preferredPropertyType,
            String preferredTransactionType
    ) {
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
        this.preferredLocality = preferredLocality;
        this.preferredPropertyType = preferredPropertyType;
        this.preferredTransactionType = preferredTransactionType;
    }

    public Double getMinBudget() {
        return minBudget;
    }

    public Double getMaxBudget() {
        return maxBudget;
    }

    public String getPreferredLocality() {
        return preferredLocality;
    }

    public String getPreferredPropertyType() {
        return preferredPropertyType;
    }

    public String getPreferredTransactionType() {
        return preferredTransactionType;
    }
}