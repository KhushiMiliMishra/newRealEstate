package com.example.demo.service;

import com.example.demo.dto.PropertyRequest;
import com.example.demo.entity.Property;
import com.example.demo.entity.PropertyAddress;
import com.example.demo.repository.PropertyAddressRepository;
import com.example.demo.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.RecentlyViewedRepository;
import com.example.demo.entity.PropertyAmenity;
import com.example.demo.repository.PropertyAmenityRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyAddressRepository propertyAddressRepository;
    @Autowired
private RecentlyViewedRepository recentlyViewedRepository;
@Autowired
private PropertyAmenityRepository propertyAmenityRepository;

    @Override
public Property createProperty(PropertyRequest request) {

    Property property = new Property();

    property.setAgentId(request.getAgentId());
    property.setTitle(request.getTitle());
    property.setDescription(request.getDescription());

    property.setPropertyType(request.getPropertyType());
    property.setTransactionType(request.getTransactionType());

    property.setPrice(request.getPrice());

    property.setBhk(request.getBhk());
    property.setBathrooms(request.getBathrooms());
    property.setBalconies(request.getBalconies());
    property.setAreaSqft(request.getAreaSqft());

    property.setFloorNo(request.getFloorNo());
    property.setTotalFloors(request.getTotalFloors());

    property.setFurnishingStatus(request.getFurnishingStatus());
    property.setPropertyAge(request.getPropertyAge());

    // Database allowed values
    property.setListingStatus("PENDING_REVIEW");
    property.setPropertyStatus("AVAILABLE");

    property.setCity(request.getCity());
    property.setAddress(request.getAddressLine());

    property.setImage1(request.getImage1());
    property.setImage2(request.getImage2());
    property.setImage3(request.getImage3());
    property.setImage4(request.getImage4());
    property.setImage5(request.getImage5());

    property.setVideoUrl(request.getVideoUrl());
    property.setFloorPlanUrl(request.getFloorPlanUrl());
    property.setVirtualTourUrl(request.getVirtualTourUrl());

    property.setStatus("ACTIVE");
    property.setCreatedAt(LocalDateTime.now());

    Property savedProperty = propertyRepository.save(property);

    PropertyAddress address = new PropertyAddress();

    address.setPropertyId(savedProperty.getPropertyId());

    address.setAddressLine(request.getAddressLine());
    address.setLocality(request.getLocality());

    address.setCity(request.getCity());
    address.setState(request.getState());
    address.setCountry(request.getCountry());
    address.setPincode(request.getPincode());

    address.setLatitude(request.getLatitude());
    address.setLongitude(request.getLongitude());

   propertyAddressRepository.save(address);

if (request.getAmenityIds() != null) {

    for (Long amenityId : request.getAmenityIds()) {

        PropertyAmenity amenity =
                new PropertyAmenity();

        amenity.setPropertyId(
                savedProperty.getPropertyId());

        amenity.setAmenityId(
                amenityId);

        propertyAmenityRepository.save(
                amenity);
    }
}

return savedProperty;
}

    @Override
    public List<Property> getPropertiesByAgent(Long agentId) {
        return propertyRepository.findByAgentId(agentId);
    }
    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Property getPropertyById(Long propertyId) {
        return propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }
    @Override
    public Property approveProperty(Long propertyId) {

        Property property =
                propertyRepository.findById(propertyId)
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));

        property.setListingStatus("APPROVED");

        return propertyRepository.save(property);
    }

    @Override
    public Property rejectProperty(Long propertyId) {

        Property property =
                propertyRepository.findById(propertyId)
                .orElseThrow(() ->
                        new RuntimeException("Property not found"));

        property.setListingStatus("REJECTED");

        return propertyRepository.save(property);
}
@Override
public Property updateProperty(
        Long id,
        PropertyRequest request) {

    Property property =
            propertyRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Property not found"));

    property.setTitle(request.getTitle());
    property.setDescription(request.getDescription());
    property.setPrice(request.getPrice());
    property.setBhk(request.getBhk());
    property.setBathrooms(request.getBathrooms());
    property.setBalconies(request.getBalconies());
    property.setAreaSqft(request.getAreaSqft());

    property.setPropertyType(
            request.getPropertyType());

    property.setTransactionType(
            request.getTransactionType());

    property.setFurnishingStatus(
            request.getFurnishingStatus());

    property.setPropertyAge(
            request.getPropertyAge());

    property.setAddress(
            request.getAddressLine());

    property.setCity(
            request.getCity());

    return propertyRepository.save(property);
}

@Override
public void deleteProperty(Long id) {

    // Delete recently viewed records
    recentlyViewedRepository.deleteByPropertyId(id);

    // Delete amenity mappings
    propertyAmenityRepository.deleteByPropertyId(id);

    // Delete property address
    PropertyAddress address =
            propertyAddressRepository.findByPropertyId(id);

    if (address != null) {
        propertyAddressRepository.delete(address);
    }

    // Finally delete property
    propertyRepository.deleteById(id);
}
@Override
public List<Property> searchProperties(
        String city,
        Integer bhk,
        String propertyType,
        String transactionType) {

    if (city != null) {
        return propertyRepository.findByCityIgnoreCase(city);
    }

    if (bhk != null) {
        return propertyRepository.findByBhk(bhk);
    }

    if (propertyType != null) {
        return propertyRepository.findByPropertyTypeIgnoreCase(propertyType);
    }

    if (transactionType != null) {
        return propertyRepository.findByTransactionTypeIgnoreCase(transactionType);
    }

    return propertyRepository.findAll();
}
@Override
public List<Property> searchByPriceRange(
        Double minPrice,
        Double maxPrice) {

    return propertyRepository.findByPriceBetween(
            minPrice,
            maxPrice);
}
}