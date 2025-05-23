export interface Order {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  date: string;
  value: string;
  notes?: string;
}

export interface OrderFormData {
  customer: string;
  origin: string;
  destination: string;
  value: string;
  notes?: string;
}

export interface EditOrderModalProps {
  order: Order | null;
  onClose: () => void;
  onSave: (order: Order) => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderId: string | null;
}

export interface AllOrdersPageProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (orderId: string) => void;
}

export interface CreateOrderPageProps {
  onCreateOrder: (data: OrderFormData) => void;
}

export interface HomePageProps {
  orders: Order[];
}
