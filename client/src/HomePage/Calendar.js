import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../themes";
import { useSnackbar } from "notistack";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import VerifiedIcon from "@mui/icons-material/Verified";

const Calendar = ({ loginDetails }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const getUserId = localStorage.getItem("userId");

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5002/api/auth/getCalendarEvents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: getUserId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events from the server");
      }
      const events = await response.json();
      setCurrentEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [getUserId]);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    const eventData = {
      userId: getUserId,
      title,
      start: selected.startStr,
      end: selected.endStr,
      status: "UPCOMING",
    };

    if (title) {
      calendarApi.addEvent(eventData);
    }

    try {
      const response = await fetch(
        "http://localhost:5002/api/auth/calendarEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Calendar data has not been saved");
      }

      // Display success message
      enqueueSnackbar("Event created successful", { variant: "success" });

      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      try {
        const eventId = selected.event.extendedProps.eventId;
        const response = await fetch(
          "http://localhost:5002/api/auth/deleteCalendarEvent",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: getUserId, eventId: eventId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete event");
        }

        // Remove the event from the calendar on successful deletion
        selected.event.remove();

        // Optionally update state or display a success message
        enqueueSnackbar("Event deleted successfully", { variant: "success" });
      } catch (error) {
        console.error("Error deleting event:", error);
        enqueueSnackbar("Failed to delete event", { variant: "error" });
      }
    }
  };

  const handleEventCompleted = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/auth/markEventCompleted/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark event as completed");
      }
      // If the event is marked as completed successfully, fetch updated events
      fetchEvents();
      // Optionally display a success message
      enqueueSnackbar("Event marked as completed", { variant: "success" });
    } catch (error) {
      console.error("Error marking event as completed:", error);
      enqueueSnackbar("Failed to mark event as completed", {
        variant: "error",
      });
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor:
                    event.status === "UPCOMING"
                      ? colors.greenAccent[500]
                      : event.status === "ONGOING"
                      ? "#ffacc4"
                      : event.status === "COMPLETED"
                      ? "#8088FF"
                      : "",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography>
                        <div style={{ fontWeight: "bolder" }}>
                          {event.status}
                        </div>
                      </Typography>
                    </>
                  }
                />
                {event.status === "ONGOING" && (
                  <IconButton
                    onClick={() => handleEventCompleted(event.eventId)}
                  >
                    <DomainVerificationIcon />
                  </IconButton>
                )}

                {event.status === "COMPLETED" && (
                  <IconButton>
                    <VerifiedIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
