import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X, Settings, Plus } from 'lucide-react';

// Types
type AlertType = 'success' | 'warning' | 'info' | 'error';
type TriggerType = 'site_event' | 'user_action' | 'merchant_performance';

interface AlertConfig {
  id: string;
  name: string;
  type: AlertType;
  triggerType: TriggerType;
  condition: string;
  threshold?: number;
  enabled: boolean;
}

interface NotificationProps {
  initialAlerts?: AlertConfig[];
}

// Helper functions
const getIconForAlertType = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="text-green-500" />;
    case 'warning':
      return <AlertTriangle className="text-yellow-500" />;
    case 'error':
      return <AlertTriangle className="text-red-500" />;
    case 'info':
    default:
      return <Info className="text-blue-500" />;
  }
};

const getTriggerTypeLabel = (triggerType: TriggerType) => {
  switch (triggerType) {
    case 'site_event':
      return 'Site Event';
    case 'user_action':
      return 'User Action';
    case 'merchant_performance':
      return 'Merchant Performance';
    default:
      return 'Unknown';
  }
};

export default function Notification({ initialAlerts = [] }: NotificationProps) {
  const [alerts, setAlerts] = useState<AlertConfig[]>(initialAlerts);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<AlertConfig>>({
    type: 'info',
    triggerType: 'site_event',
    enabled: true,
  });

  // For demo purposes, add some default alerts if none provided
  useEffect(() => {
    if (initialAlerts.length === 0) {
      setAlerts([
        {
          id: '1',
          name: 'Low Inventory Alert',
          type: 'warning',
          triggerType: 'merchant_performance',
          condition: 'Inventory below threshold',
          threshold: 10,
          enabled: true,
        },
        {
          id: '2',
          name: 'New User Registration',
          type: 'info',
          triggerType: 'user_action',
          condition: 'New user registers',
          enabled: true,
        },
        {
          id: '3',
          name: 'Sales Target Achieved',
          type: 'success',
          triggerType: 'merchant_performance',
          condition: 'Daily sales exceed target',
          threshold: 1000,
          enabled: false,
        },
      ]);
    }
  }, [initialAlerts.length]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showAddAlert) setShowAddAlert(false);
  };

  const toggleAddAlert = () => {
    setShowAddAlert(!showAddAlert);
  };

  const toggleAlertEnabled = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleNewAlertChange = (field: keyof AlertConfig, value: any) => {
    setNewAlert({ ...newAlert, [field]: value });
  };

  const addNewAlert = () => {
    if (!newAlert.name || !newAlert.condition) return;
    
    const newAlertComplete: AlertConfig = {
      id: Date.now().toString(),
      name: newAlert.name || '',
      type: newAlert.type || 'info',
      triggerType: newAlert.triggerType || 'site_event',
      condition: newAlert.condition || '',
      threshold: newAlert.threshold,
      enabled: newAlert.enabled || true,
    };
    
    setAlerts([...alerts, newAlertComplete]);
    setNewAlert({
      type: 'info',
      triggerType: 'site_event',
      enabled: true,
    });
    setShowAddAlert(false);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button 
        className="relative p-2 rounded-full hover:bg-gray-100"
        onClick={toggleNotifications}
      >
        <Bell className="w-6 h-6" />
        {alerts.filter(a => a.enabled).length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {alerts.filter(a => a.enabled).length}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-medium">Notifications & Alert Settings</h3>
            <div className="flex space-x-2">
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={toggleAddAlert}
                title="Add new alert"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={toggleNotifications}
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add New Alert Form */}
          {showAddAlert && (
            <div className="p-4 border-b">
              <h4 className="font-medium mb-2">Add New Alert</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newAlert.name || ''}
                    onChange={(e) => handleNewAlertChange('name', e.target.value)}
                    placeholder="Alert name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newAlert.type}
                    onChange={(e) => handleNewAlertChange('type', e.target.value)}
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newAlert.triggerType}
                    onChange={(e) => handleNewAlertChange('triggerType', e.target.value as TriggerType)}
                  >
                    <option value="site_event">Site Event</option>
                    <option value="user_action">User Action</option>
                    <option value="merchant_performance">Merchant Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newAlert.condition || ''}
                    onChange={(e) => handleNewAlertChange('condition', e.target.value)}
                    placeholder="Condition"
                  />
                </div>

                {newAlert.triggerType === 'merchant_performance' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
                    <input 
                      type="number"
                      className="w-full p-2 border rounded-md"
                      value={newAlert.threshold || ''}
                      onChange={(e) => handleNewAlertChange('threshold', parseInt(e.target.value))}
                      placeholder="Threshold value"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-2">
                  <button 
                    className="px-3 py-1 bg-gray-200 rounded-md"
                    onClick={() => setShowAddAlert(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    onClick={addNewAlert}
                  >
                    Add Alert
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Alert List */}
          <div className="max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No alerts configured
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getIconForAlertType(alert.type)}
                      </div>
                      <div>
                        <div className="font-medium">{alert.name}</div>
                        <div className="text-sm text-gray-600">{alert.condition}</div>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-gray-100 px-2 rounded-full">
                            {getTriggerTypeLabel(alert.triggerType)}
                          </span>
                          {alert.threshold && (
                            <span className="text-xs bg-gray-100 px-2 rounded-full ml-2">
                              Threshold: {alert.threshold}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={alert.enabled}
                          onChange={() => toggleAlertEnabled(alert.id)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                      <button 
                        className="p-1 text-gray-400 hover:text-red-500"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-gray-50 text-sm flex justify-center">
            <button className="flex items-center text-blue-500 hover:text-blue-700">
              <Settings className="w-4 h-4 mr-1" />
              Configure notification preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}