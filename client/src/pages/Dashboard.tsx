import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { fetchOrders } from '../services/orderService';
import { Order, OrderStatus, OrderType } from '../types/order';
import OrderCard from '../components/OrderCard';

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import DraggableOrderCard from '../components/DraggableOrderCard';
import DroppableContainer from '../components/DroppableContainer';
import { updateOrder } from '../services/orderService'; // assuming update endpoint


const Dashboard: React.FC = () => {

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const orderId = active.id.toString();
    const newStatus = over.id.toString() as OrderStatus;

    const updatedOrders = orders.map((order) =>
      order.id.toString() === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);

    try {
      await updateOrder(orderId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };


  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data: any = await fetchOrders({
          status: statusFilter || undefined,
          orderType: orderTypeFilter || undefined,
          customerName: searchQuery || undefined,
          limit: 100,
        });
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
    };

    loadOrders();
  }, [statusFilter, orderTypeFilter, searchQuery]);

  const statuses: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'completed',
  ];

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    let result = [...orders];
    
    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter);
    }
    
    if (searchQuery) {
      result = result.filter(order => 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (orderTypeFilter) {
      result = result.filter(order => order.orderType === orderTypeFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, statusFilter, orderTypeFilter, searchQuery]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Dashboard
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <TextField
          label="Search by Customer"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value ={statusFilter === "" ? "" : statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem  value="">All</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Order Type</InputLabel>
          <Select
            value={orderTypeFilter}
            label="Order Type"
            onChange={(e) => setOrderTypeFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pickup">Pickup</MenuItem>
            <MenuItem value="delivery">Delivery</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Status Columns */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ 
          width: '100%',
          overflowX: 'auto', // Horizontal scrolling only when necessary
          py: 2
        }}>
          <Box 
          sx={{
              display: 'flex',
              gap: 3,
              minWidth: 'max-content', // Ensures children don't wrap
              px: 2
          }}
          >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {statuses.map((status) => (
               <Box 
                  key={status}
                  sx={{
                    height: '500px',
                    width: '280px', // Fixed width for each column
                    marginLeft: '20px',
                    flexShrink: 0 // Prevents shrinking
                  }}
                >
                  <DroppableContainer id={status}>
                      {filteredOrders
                        .filter((order) => order.status === status)
                        .map((order) => (
                          <DraggableOrderCard key={order.id} order={order} />
                        ))}
                  </DroppableContainer>
          </Box>
      ))}
    </DndContext>
  </Box>
  </Box>
      )}
    </Container>
  );
};

export default Dashboard;