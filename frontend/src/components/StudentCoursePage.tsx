import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api";
import { Box, Typography, Button, Card, CardContent, CardActionArea } from "@mui/material";

interface Chapter { id: number; title: string; }

function StudentCoursePage() {
  const { id } = useParams();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`chapter/?course=${id}`).then((res) => setChapters(res.data));
  }, [id]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Button onClick={() => navigate("/student")}>← Back</Button>
      <Typography variant="h4" gutterBottom>Chapters</Typography>
      {chapters.length === 0 && <Typography>No public chapters available.</Typography>}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
        {chapters.map((ch) => (
          <Card key={ch.id} sx={{ width: 200 }}>
            <CardActionArea onClick={() => navigate(`/student/chapter/${ch.id}`)}>
              <CardContent><Typography variant="h6">{ch.title}</Typography></CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default StudentCoursePage;