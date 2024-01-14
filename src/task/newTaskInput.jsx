import { useState } from "react";

export function NewTaskForm({ onSubmit }) {
  onSubmit;
  const [item, setItem] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  var gapi = window.gapi;

  async function taskHandle(e) {
    e.preventDefault();

    if (setItem === "") return;
    onSubmit(item);
    setItem("");

    // google requests
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: "AIzaSyCHYtE2AVK5fCcDqGN7IK1zjq7Vx - BZy18",
        clientId:
          "526490962762-6g02tsf29m2e91elbsq4ep19lki48oo0.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar",
      });

      gapi.client.load("calendar", "v3", () => console.log("loaded cal"));

      // allows to add event to google calendar
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: item,

            description: "Added from Todo List",
            start: {
              dateTime: new Date(selectedDate).toISOString(),
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: new Date(selectedDate).toISOString(),
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };
          const request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  }
  return (
    <form onSubmit={taskHandle}>
      <div>
        <label htmlFor="userInput">New Item</label>
        <input
          type="text"
          id="userInput"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Enter a task..."
        />
        <br></br>
        <div>
          <p>Finish by... year-month-day</p>
          <input
            id="userDate"
            placeholder="enter date in form year-month-day"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn">
        Add Task
      </button>
    </form>
  );
}
