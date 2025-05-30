"use server";
import app_axios from "@/lib/axios";
import { unstable_cache } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createEvent = async (eventData: FieldValues) => {
  try {
    const res = await app_axios.post("/event", eventData);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while creating the event!";
    return new Error(message);
  }
};

// interface for params
interface IGetEventParams {
  searchTerm?: string;
  isPaid?: string;
  sortBy?: string;
  sortOrder?: string;
  category?: string;
}

export const getAllEvents = async ({
  searchTerm,
  isPaid,
  sortBy,
  sortOrder,
  category,
}: IGetEventParams = {}) => {
  try {
    const params = new URLSearchParams();
    if (searchTerm) params.append("searchTerm", searchTerm);
    if (isPaid) params.append("isPaid", isPaid);
    if (sortBy) params.append("sortBy", sortBy);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (category) params.append("category", category);
    const res = await app_axios.get(`/event/all-events?${params.toString()}`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting events!";
    return new Error(message);
  }
};

export const getAllEventsCache = unstable_cache(getAllEvents, ["events"], {
  tags: ["events"],
});

export const getSingleEvent = async (id: string) => {
  try {
    const res = await app_axios.get(`/event/${id}`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting a event!";
    return new Error(message);
  }
};

export const eventCategoryStats = async () => {
  try {
    const res = await app_axios.get(`/event/event-category-stats`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting a event!";
    return new Error(message);
  }
};

export const updateEvent = async (id: string, data: any) => {
  try {
    const res = await app_axios.put(`/event/${id}`, data);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while updating event";
    return new Error(message);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const res = await app_axios.delete(`/event/${id}`);
    console.log("delete event response", res.data)
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while deleting event";
    return new Error(message);
  }
};


export const getAllUserEvents = async() => {
  try {
    const res = await app_axios.get(`/event/my-created-events`);
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong while getting events!";
    return new Error(message);
  }
}