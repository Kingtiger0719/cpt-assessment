import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Order } from '../types/order';
import OrderCard from './OrderCard';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box, IconButton } from '@mui/material';

interface Props {
  order: Order;
}

const DraggableOrderCard: React.FC<Props> = ({ order }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: order.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Box ref={setNodeRef} style={style}>
      {/* Drag Handle */}
      <IconButton
        {...listeners}
        {...attributes}
        aria-label="drag handle"
        sx={{ cursor: 'grab', mr: 1 }}
      >
        <DragIndicatorIcon />
      </IconButton>

      {/* The rest of the card is not draggable, so clicks work */}
      <Box flexGrow={1}>
        <OrderCard order={order} />
      </Box>
    </Box>
  );
};

export default DraggableOrderCard;
