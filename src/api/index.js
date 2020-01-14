import request from '../utils/request';

import axios from 'axios';

// var baseUrl = 'http://localhost:9099/'
var baseUrl = 'http://120.27.242.116:9098/'

export const customList = (query) => {
    return request({
        url: baseUrl + 'customer/list/all',
        method: 'post',
        params: query
    });
};

export const addCustom = (name) => {
    return request({
        url: baseUrl + 'customer/insert',
        method: 'post',
        params: name
    });
};

export const delCustom = (id) => {
    return request({
        url: baseUrl + 'customer/delete',
        method: 'post',
        params: id
    });
};

export const flightList = (query) => {
    return request({
        url: baseUrl + 'flight/list/all',
        method: 'post',
        params: query
    });
};

export const addFlight = (query) => {
    return request({
        url: baseUrl + 'flight/insert',
        method: 'post',
        params: query
    });
};

export const delFlight = (id) => {
    return request({
        url: baseUrl + 'flight/delete',
        method: 'post',
        params: id
    });
};

export const carList = (query) => {
    return request({
        url: baseUrl + 'car/list/all',
        method: 'post',
        params: query
    });
};

export const addCar = (query) => {
    return request({
        url: baseUrl + 'car/insert',
        method: 'post',
        params: query
    });
};

export const delCar = (id) => {
    return request({
        url: baseUrl + 'car/delete',
        method: 'post',
        params: id
    });
};

export const hotelList = (query) => {
    return request({
        url: baseUrl + 'hotel/list/all',
        method: 'post',
        params: query
    });
};

export const addHotel = (query) => {
    return request({
        url: baseUrl + 'hotel/insert',
        method: 'post',
        params: query
    });
};

export const delHotel = (id) => {
    return request({
        url: baseUrl + 'hotel/delete',
        method: 'post',
        params: id
    });
};

export const flightBookList = (query) => {
    return request({
        url: baseUrl + 'reservation/flight/list',
        method: 'post',
        params: query
    });
};

export const addFlightBook = (query) => {
    return request({
        url: baseUrl + 'reservation/flight/insert',
        method: 'post',
        params: query
    });
};

export const delFlightBook = (id) => {
    return request({
        url: baseUrl + 'reservation/flight/cancel',
        method: 'post',
        params: id
    });
};

export const carBookList = (query) => {
    return request({
        url: baseUrl + 'reservation/car/list',
        method: 'post',
        params: query
    });
};

export const addCarBook = (query) => {
    return request({
        url: baseUrl + 'reservation/car/insert',
        method: 'post',
        params: query
    });
};

export const delCarBook = (id) => {
    return request({
        url: baseUrl + 'reservation/car/cancel',
        method: 'post',
        params: id
    });
};

export const hotelBookList = (query) => {
    return request({
        url: baseUrl + 'reservation/hotel/list',
        method: 'post',
        params: query
    });
};

export const addHotelBook = (query) => {
    return request({
        url: baseUrl + 'reservation/hotel/insert',
        method: 'post',
        params: query
    });
};

export const delHotelBook = (id) => {
    return request({
        url: baseUrl + 'reservation/hotel/cancel',
        method: 'post',
        params: id
    });
};

export const travelList = (query) => {
    return request({
        url: baseUrl + 'reservation/path',
        method: 'post',
        params: query
    });
};

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
