const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
const { Connection } = require("mongoose");
//@desc Get all contacts
//@route Get/api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});
//@desc get contact
//@route Get /api/contacts/:id
//@access private
const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@desc create contact
//@route Post/api/contact
//@access public
const createContact= asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json({contact});
});
//@desc update contact
//@route Put /api/contacts/:id
//@access public
const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //Auth validation
    if(contact.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contact");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});
//@desc Delete contact
//@route Delete /api/contacts/:id
//@access private
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    //Auth validation
    if(contact.user_id.toString()!=req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});
module.exports={ getContacts, getContact , createContact, updateContact, deleteContact};