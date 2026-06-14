package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "agent_profiles")
public class AgentProfile {

    @Id
    @Column(name = "agent_id")
    private Long agentId;

    @Column(name = "agency_name")
    private String agencyName;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "office_address")
    private String officeAddress;

    @Column(name = "verification_status")
    private String verificationStatus;

    @Column(name = "average_rating")
    private Double averageRating;

    @Column(name = "total_reviews")
    private Integer totalReviews;

    @Column(name = "available_days")
    private String availableDays;

    @Column(name = "available_time_from")
    private String availableTimeFrom;

    @Column(name = "available_time_to")
    private String availableTimeTo;

    public AgentProfile() {
    }

    public Long getAgentId() {
        return agentId;
    }

    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public String getAvailableDays() {
        return availableDays;
    }

    public void setAvailableDays(String availableDays) {
        this.availableDays = availableDays;
    }

    public String getAvailableTimeFrom() {
        return availableTimeFrom;
    }

    public void setAvailableTimeFrom(String availableTimeFrom) {
        this.availableTimeFrom = availableTimeFrom;
    }

    public String getAvailableTimeTo() {
        return availableTimeTo;
    }

    public void setAvailableTimeTo(String availableTimeTo) {
        this.availableTimeTo = availableTimeTo;
    }
}