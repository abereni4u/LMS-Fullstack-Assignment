import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { Box, Typography, Button, Card, CardContent, CardActionArea, TextField } from "@mui/material";

interface Course {
  id: number;
  title: string;
  description: string;
}

function InstructorDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Fetch courses on load
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await api.get("course/");
    setCourses(res.data);
  };

  const createCourse = async () => {
    if (!title.trim()) return;
    await api.post("course/", { title, description: "" });
    setTitle("");
    setShowForm(false);
    loadCourses(); // refresh the list
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Courses</Typography>

      {courses.length === 0 && <Typography>You have no courses. Add a new course.</Typography>}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
        {courses.map((c) => (
          <Card key={c.id} sx={{ width: 200 }}>
            <CardActionArea onClick={() => navigate(`/instructor/course/${c.id}`)}>
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {showForm ? (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField label="Course title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button variant="contained" onClick={createCourse}>Save</Button>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
        </Box>
      ) : (
        <Button variant="contained" onClick={() => setShowForm(true)}>+ Add Course</Button>
      )}
    </Box>
  );
}

export default InstructorDashboard;