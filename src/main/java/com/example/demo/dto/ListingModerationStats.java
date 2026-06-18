package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ListingModerationStats {

    private Long totalListings;
    private Long pendingListings;
    private Long approvedListings;
    private Long rejectedListings;
}