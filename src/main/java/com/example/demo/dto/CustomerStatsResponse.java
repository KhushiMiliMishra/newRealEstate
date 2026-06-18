package com.example.demo.dto;

public class CustomerStatsResponse {

    private long totalCustomers;
    private long activeCustomers;
    private long suspendedCustomers;

    public CustomerStatsResponse(
            long totalCustomers,
            long activeCustomers,
            long suspendedCustomers
    ) {
        this.totalCustomers = totalCustomers;
        this.activeCustomers = activeCustomers;
        this.suspendedCustomers = suspendedCustomers;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public long getActiveCustomers() {
        return activeCustomers;
    }

    public long getSuspendedCustomers() {
        return suspendedCustomers;
    }
}