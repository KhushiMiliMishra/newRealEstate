package com.example.demo.dto;

public class AdminDashboardResponse {

    private Long totalUsers;
    private Long totalProperties;
    private Long totalViewings;

    public AdminDashboardResponse(
            Long totalUsers,
            Long totalProperties,
            Long totalViewings) {

        this.totalUsers = totalUsers;
        this.totalProperties = totalProperties;
        this.totalViewings = totalViewings;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public Long getTotalProperties() {
        return totalProperties;
    }

    public Long getTotalViewings() {
        return totalViewings;
    }
}