'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const functions = require('./functions');
server.use(bodyParser.json());


//const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');

// Enter your calendar ID and service account JSON below.
const calendarId = '<INSERT CALENDAR ID HERE>'; // Example: 6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com
const serviceAccount = {
    "type": "service_account",
    "project_id": "cobra-lijklx",
    "private_key_id": "bef7a4dd1e6e950045f20d8e9ff6dc570c1d5e16",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDlTAKJxHNizUtZ\nicR8/4vj5PHv6kRdYG0x+RYzCldpYw4urvw1tMIpIfdpY3KneNk60vIovFrfRZ5T\nBc9z7tsbvlmYU00MQVOfMKGA+Q2iCDlMR7i4L2M2lPK1fLy/UReYPGmBPqKY+/1P\no/wWOPKQ7Xo+D4vskfeFjVxnp4NQVZVqfsLfJzHEsIYOFV/UtoQiOg5S16lJi7Gt\nnHSpbs7zRyRjOOooJbwqEUDzJ5S6NYGvgxrueXC1XZqBANtARfGrDDI+JXh3Dn3O\nbN9ovwMofoR4Dve+xm6mGDNu8MyqZKiH8iHZUC9XSdKMliPcYLgpY62ga/MRcbFj\nG0faishJAgMBAAECggEAYaHgvspwGxSwzbo0eMjSxsGYJoCIhX3mYM3fnvH7UDtG\nMah+aVvDBIKa9zvJ+Pci/8IMLD4vLzxUcqNZttJwZzrAqXRmrR4vveuWCPWC0YhQ\n5WLwizRaOUZopdAsCgY8Vqz6e3axAxTgwgVf9BJhbkY/s6co/B0W2L3dJ6GS7yQD\nVa2i2Raea5CvkAucbqAvA4N3rF1/l7mQWhTE+lxKashR5pw1qTvRHZ5eWfvDZUTr\nADnr175V7HXpzmGWw1Oc82ROUeWvfz+WsJzRgHj0Z+AV44Iq9dxvRzeBVtelI/Ib\n66PU8WvFAgEkemRRYAWCNjkYFAT1ysSUYigmtVJAFQKBgQD7yVrlsd1y0vQlF59/\nWprnqqSr9zYYTl0tb9LOKm7qsBV6hDx9qhXyy3uxmV3n5WKepw/NtWWnOSQr93hZ\n9/s2yhqYD3i71mUeJ/9b+6qoqogmE2fkx32u8SbEP4mqKBzHr3fHBkFV8kwEQCE1\nuiNb2h3z0K0g6eSRqx00o2LFZwKBgQDpIk9fEI9fKoyi3KcG1MvUEHH4jlDYR4H/\nxbVUV4V+kXWsVuhGdlLYX8W7mlEIpO7F9ZbjC93Dt3ivF4PtBb2KM5SlG0707c4K\n6H6ApyMwXd4F7EoZw3v3Rt3Qs5A8AdVjYnBGwjVBuR2Pz0xITT09OwzTdf73ljth\n3+5ce9VGzwKBgCcmIboBM9t8rXVu/N/CaL+Iqt4KLCEPXjGIZ5CizGg1RMGt+fHY\nFl2QAgWVQSKjafgdJbnocIvVuKgVbGMgybC1L/lgvncGWOaddXkJ4nkjOtQgxFCw\nK/ydhleRQYhxgDgUMl2BvXrtl6A5kHBYJtNLUMjuM10gwOddYccjeGIVAoGAXMNv\nK5duROKsVP1RZJF1jSsB/nG6T2ScoIYtsaKllogQd4OZJrhcHIZ3Kj+r8LGX5KLk\n5/DHy+GMHrdPohc/pOcDRXMJRsH80zBRbaWTheJDvr2XeorjH7BOAIYCZS4hl0sK\n+8y43i7nSVqlsrsxG9UMNHPmAOQBOt+ce6Y2ZdcCgYBsMcocVGeG4V/hUhbHTGrx\nOTBniBsA3TcUUvzys0sIWXTKGsLQaj3PJF+43TRJdWxj7dBkzeOwgZvsW2GbKFhF\ncj1xMLIJZTyfBeZk9VTznSL7p6LmDmj1RaAE9fmv4gNLpa9HV7rD1Bjkjzyao1ri\naXwLLIwFP0N5XF8VDEchBA==\n-----END PRIVATE KEY-----\n",
    "client_email": "dialogflow-syxkyl@cobra-lijklx.iam.gserviceaccount.com",
    "client_id": "102174676582687003651",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-syxkyl%40cobra-lijklx.iam.gserviceaccount.com"
}; // The JSON object looks like: { "type": "service_account", ... }

// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
//process.env.DEBUG = 'dialogflow:*'; // It enables lib debugging statements

const timeZone = 'America/Los_Angeles';  // Change it to your time zone
const timeZoneOffset = '-07:00';         // Change it to your time zone offset

exports.dialogflowFirebaseFulfillment = server.post("/", async (req, res) => {
  const agent = new WebhookClient({ req, res });

  function makeAppointment (agent) {
    // Use the Dialogflow's date and time parameters to create Javascript Date instances, 'dateTimeStart' and 'dateTimeEnd',
    // which are used to specify the appointment's time.
    const appointmentDuration = 1;// Define the length of the appointment to be one hour.
    const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
    const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);
    const appointmentTimeString = getLocaleTimeString(dateTimeStart);
    const appointmentDateString = getLocaleDateString(dateTimeStart);
    // Check the availability of the time slot and set up an appointment if the time slot is available on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd).then(() => {
      agent.add(`Got it. I have your appointment scheduled on ${appointmentDateString} at ${appointmentTimeString}. See you soon. Good-bye.`);
    }).catch(() => {
      agent.add(`Sorry, we're booked on ${appointmentDateString} at ${appointmentTimeString}. Is there anything else I can do for you?`);
    });
  }
  let intentMap = new Map();
  intentMap.set('Make Appointment', makeAppointment);  // It maps the intent 'Make Appointment' to the function 'makeAppointment()'
  agent.handleRequest(intentMap);
});

function createCalendarEvent (dateTimeStart, dateTimeEnd) {
  return new Promise((resolve, reject) => {
    calendar.events.list({  // List all events in the specified time period
      auth: serviceAccountAuth,
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there exists any event on the calendar given the specified the time period
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create an event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: 'Bike Appointment',
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}

// A helper function that receives Dialogflow's 'date' and 'time' parameters and creates a Date instance.
function convertParametersDate(date, time){
  return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('-')[0] + timeZoneOffset));
}

// A helper function that adds the integer value of 'hoursToAdd' to the Date instance 'dateObj' and returns a new Data instance.
function addHours(dateObj, hoursToAdd){
  return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this time in English.
function getLocaleTimeString(dateObj){
  return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: timeZone });
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this date in English.
function getLocaleDateString(dateObj){
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone });
}

   
const local = false;
local ? server.listen(3000) : server.listen(process.env.PORT);
