import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost/NIROO GYM/BACKEND'
})
// getting data from database
export const getEarning = (earn) => api.get(`/getEarn.php?earn=${earn}`).then(res => res.data);
export const getUser = () => api.get('/getUser.php').then(res => res.data);
export const getSingleUser = (id) => api.get(`/getSingleUser.php?id=${id}`).then(res => res.data);
export const getSingleStaff = (id) => api.get(`/getSingleStaff.php?id=${id}`).then(res => res.data);
export const getSingleReg = (id) => api.get(`/getSingleReg.php?id=${id}`).then(res => res.data);
export const getSingleAgr = (id) => api.get(`/getSingleAgr.php?id=${id}`).then(res => res.data);
export const getReceipts = (id) => api.get(`/getReceipts.php?id=${id}`).then(res => res.data);
export const getAgrReg = (id) => api.get(`/getAgrReg.php?id=${id}`).then(res => res.data);
export const searching = (searchData) => api.get(`/search.php?search=${searchData}`).then(res => res.data);
export const getSingleTime = (id, earn) => api.get(`/getSingleTime.php?earn=${earn}&id=${id}`).then(res=> res.data);
export const getStaff = () => api.get('/getStaff.php').then(res => res.data);
export const getLoan = () => api.get('/getLoan.php').then(res => res.data);
export const getParking = () => api.get('/getParking.php').then(res => res.data);
export const getBook = () => api.get('/getBook.php').then(res => res.data);
export const getExpence = () => api.get('/getExpences.php').then(res => res.data);
export const getRegtime = (status) => api.get(`/getRegtime.php?status=${status}`).then(res => res.data);
export const getAgrtime = (status) => api.get(`/getAgrtime.php?status=${status}`).then(res => res.data);
export const getPayedRegtime = () => api.get('/getPayedRegtime.php').then(res => res.data);
export const getBank = () => api.get('/getBank.php').then(res => res.data);
export const getInfo = () => api.get('/getInfo.php').then(res => res.data);
export const getData = () => api.get('/getData.php').then(res => res.data);


//actions delete, update ...
//login page 
export const LoginHandler = async(loginData)=>{
    const response = await api.post('/loginHandler.php', loginData);
    console.log(response.token)
}
//delete user
export const deleteUser = async (id) => {
    const response = await api.get(`/deleteUser.php?id=${id}`)
}

//delete staff 
export const deleteStaff = async (id) => {
    const response = await api.get(`/deleteStaff.php?id=${id}`)
}
//delete loans 
export const deleteLoan = async (id) => {
    const response = await api.get(`/deleteLoan.php?id=${id}`)
}
//update users 
export const updateUser = async ({ id, ...updatedUser }) => {
    const { data } = await api.put(`/updateUser.php?id=${id}`, updatedUser);
    return data;
}

// update staff
export const updateStaff = async ({ id, ...updatedStaff }) => {
    const { data } = await api.put(`/updateStaff.php?id=${id}`, updatedStaff);
    return data;
}
// update regular time 
export const updateReg = async ({id, ...updatedReg}) => {
    const {data} = await api.put(`/updateReg.php?id=${id}`, updatedReg);
    return data;
} 
// update status of regular time 
export const submitRegtime = async ({id, ...updatedSubmit}) => {
    const {data} = await api.put(`/submitRegtime.php?id=${id}`, updatedSubmit);
    return data;
}
// update status of regular time 
export const submitAgrtime = async ({id, ...updatedSubmit}) => {
    const {data} = await api.put(`/submitAgrtime.php?id=${id}`, updatedSubmit);
    return data;
}
// update agreement time
export const updateAgrtime = async ({id, ...updatedAgr}) => {
    const {data} = await api.put(`/updateAgrtime.php?id=${id}`, updatedAgr);
    return data;
}
// insert user into database
export const addUser = async (userdata) => {
    const { data } = await api.post('/insertUser.php', userdata);
}
// restore regular times 
export const restoreReg = async (id)=>{
    const {data} = await api.get(`/restoreReg.php?id=${id}`);
    return data;
} 
//inset staff into database 
export const addStaff = async (staffData) => {
    const { data } = await api.post('/insertStaff.php', staffData);
}
//insert park tax 
export const addPark = async (parkData) => {
    const { data } = await api.post('/insertPark.php', parkData);
}
//insert book tax 
export const addBook = async (bookData) => {
    const { data } = await api.post('/insertBook.php', bookData);
}
//insert Expenses 
export const addExpense = async (expenseData) => {
    const { data } = await api.post('/insertExpense.php', expenseData);
}
//insert regular time 
export const addRegtime = async (regtime) => {
    const { data } = await api.post('/insertRegtime.php', regtime);
}
//insert regular time of specific agreement time 
export const addRegAgrtime = async (regtime) => {
    const { data } = await api.post('/insertRegAgrtime.php', regtime);
}
//insert regular time 
export const addAgrtime = async (agrtime) => {
    const { data } = await api.post('/insertAgrtime.php', agrtime);
}
//insert receipt
export const addReceipt = async (receipt) => {
    const { data } = await api.post('/insertReceipt.php', receipt);
}
//insert loans
export const addLoan = async (loan) => {
    const { data } = await api.post('/insertLoan.php', loan);
}
 
// uploading files 
export const uploadFile = async (file) => {
    return await api.post('/uploads.php', file, {
        'content-type': 'multipart/form-data'
    });
}
