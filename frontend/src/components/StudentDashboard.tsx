import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Course {
  id: number;
  title: string;
}

function StudentDashboard() {
  const [available, setAvailable] = useState<Course[]>([]);
  const [joined, setJoined] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // All courses, and my enrollments
    const [coursesRes, enrollRes] = await Promise.all([
      api.get("course/"),
      api.get("enrollment/"),
    ]);
    const joinedCourseIds = enrollRes.data.map((e: any) => e.course);
    setJoined(coursesRes.data.filter((c: Course) => joinedCourseIds.includes(c.id)));
    setAvailable(coursesRes.data.filter((c: Course) => !joinedCourseIds.includes(c.id)));
  };

  const joinCourse = async (courseId: number) => {
    await api.post("enrollment/", { course: courseId });
    loadData(); // refresh both lists
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Available Courses</Typography>
      {available.length === 0 && <Typography>No courses to join.</Typography>}
      <List>
        {available.map((c) => (
          <ListItem
            key={c.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => joinCourse(c.id)}>
                <AddIcon color="primary" />
              </IconButton>
            }
          >
            <ListItemText primary={c.title} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" sx={{ mt: 3 }}>Joined Courses</Typography>
      {joined.length === 0 && <Typography>You haven't joined any courses.</Typography>}
      <List>
        {joined.map((c) => (
          <ListItem key={c.id} disablePadding>
            <Button onClick={() => navigate(`/student/course/${c.id}`)}>{c.title}</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default StudentDashboard;