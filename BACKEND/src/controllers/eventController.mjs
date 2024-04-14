import express from "express";
import { response } from "../utils/response.mjs";
import {getEventsByUserId} from '../models/eventModle.mjs';
const eventController = express.Router(); 

/**
 * this router is responsible for getting all events
 * this route is a GET request
 * @name get/events
 */

eventController.get("/:user_id", async (req, res) => {
    try {
        const userId = req.params.user_id;

        const events = await getEventsByUserId(userId);

        return response.success(res,events);
    } catch (error) {
        return response.error(res, error.message);
    }
});



/**
 * this router is responsible for creating a new event
 * this route is a POST request
 * @name post/create
 * 
 */

eventController.post("/create", async (req, res) => {
    try {
        const { event_name, event_type, event_date, event_start_time, event_end_time, event_venue, department_id, status, guests, main_guest } = req.body;

        await createEvent(event_name, event_type, event_date, event_start_time, event_end_time, event_venue, department_id, status, guests, main_guest);

        return response(res, 201, "Event created successfully");
    } catch (error) {
        return response(res, 400, error.message);
    }
});

export default eventController;