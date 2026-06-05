import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { usePlateEditor, Plate, PlateContent } from "@udecode/plate/react";
import api from "../api";
import { Box, Button, CircularProgress } from "@mui/material";

const EMPTY: any = [{ type: "p", children: [{ text: "" }] }];

function StudentChapterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<any>(EMPTY);

  useEffect(() => {
    api.get(`chapter/${id}/`).then((res) => {
      const c = res.data.content;
      setValue(Array.isArray(c) && c.length ? c : EMPTY);
      setLoaded(true);
    });
  }, [id]);

  if (!loaded) return <CircularProgress sx={{ m: 4 }} />;
  return <Reader value={value} navigate={navigate} />;
}

function Reader({ value, navigate }: any) {
  const editor = usePlateEditor({ value });
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Button onClick={() => navigate(-1)}>← Back</Button>
      <Box sx={{ border: "1px solid #eee", borderRadius: 1, p: 2, mt: 2 }}>
        <Plate editor={editor}>
          <PlateContent readOnly />
        </Plate>
      </Box>
    </Box>
  );
}

export default StudentChapterView;