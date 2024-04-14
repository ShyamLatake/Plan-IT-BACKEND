import { environment } from "../config/dbconnection.mjs";
const db = environment.db;

/**
 * this function is responsible for getting all events
 * @param {*} userId 
 * @returns 
 */
export const getEventsByEventId = (eventId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM event WHERE event_id = ?', [eventId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}