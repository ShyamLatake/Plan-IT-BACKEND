import { environment } from "../config/dbconnection.mjs";
const db = environment.db;

/**
 * this function is responsible for getting all events
 * @param {*} userId 
 * @returns 
 */
export const getEventsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM event WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export const getGuestByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM guest_lecture WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


/**
 * This function is responsible for creating a new event
 * 
 * @param {*} event_name 
 * @param {*} event_type 
 * @param {*} event_date 
 * @param {*} event_start_time 
 * @param {*} event_end_time 
 * @param {*} event_venue 
 * @param {*} department_id 
 * @param {*} status 
 * @param {*} guests 
 * @param {*} main_guest 
 * @returns 
 */
export const createEvent = (event_name, event_type, event_date, event_start_time, event_end_time, event_venue, department_id, status, guests, main_guest) =>  {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO event  (event_name, event_type, event_date, event_start_time, event_end_time, event_venu, status, main_guest) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [event_name, event_type, event_date, event_start_time, event_end_time, event_venue , department_id, status, main_guest], 
            (err, result) => {
                if (err) {
                    console.error();
                    reject(err);
                } else {
                    resolve();
                }
            }
        );

    });
}