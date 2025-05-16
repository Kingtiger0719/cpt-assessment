// components/DroppableContainer.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Box, Typography } from '@mui/material';

interface Props {
  id: string;
  children: React.ReactNode;
}

const DroppableContainer: React.FC<Props> = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        height: '100%', // Takes full height of parent Grid
        width: '100%', // Takes full width
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        backgroundColor: isOver ? '#e3f2fd' : '#f9f9f9',
        transition: 'background-color 0.2s ease',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ 
        position: 'sticky', 
        top: 0, 
        bgcolor: 'background.paper',
        py: 1,
        zIndex: 1 
      }}>
        {id.toUpperCase()}
      </Typography>
      {children}
    </Box>
  );
};

export default DroppableContainer;
