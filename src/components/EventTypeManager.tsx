import React, { useState } from 'react';
import { Modal } from './Modal';
import { EventTypeConfig } from '../types';
import { Plus, Trash2, Edit3 } from 'lucide-react';

interface EventTypeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  eventTypes: EventTypeConfig[];
  onAddType: (type: Omit<EventTypeConfig, 'id'>) => void;
  onEditType: (id: string, type: Omit<EventTypeConfig, 'id'>) => void;
  onDeleteType: (id: string) => void;
}

const COLOR_THEMES = [
  { id: 'slate', label: 'Slate', bg: 'bg-slate-100', text: 'text-slate-700' },
  { id: 'red', label: 'Red', bg: 'bg-red-100', text: 'text-red-700' },
  { id: 'orange', label: 'Orange', bg: 'bg-orange-100', text: 'text-orange-700' },
  { id: 'amber', label: 'Amber', bg: 'bg-amber-100', text: 'text-amber-700' },
  { id: 'yellow', label: 'Yellow', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { id: 'lime', label: 'Lime', bg: 'bg-lime-100', text: 'text-lime-700' },
  { id: 'green', label: 'Green', bg: 'bg-green-100', text: 'text-green-700' },
  { id: 'emerald', label: 'Emerald', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { id: 'teal', label: 'Teal', bg: 'bg-teal-100', text: 'text-teal-700' },
  { id: 'cyan', label: 'Cyan', bg: 'bg-cyan-100', text: 'text-cyan-700' },
  { id: 'sky', label: 'Sky', bg: 'bg-sky-100', text: 'text-sky-700' },
  { id: 'blue', label: 'Blue', bg: 'bg-blue-100', text: 'text-blue-700' },
  { id: 'indigo', label: 'Indigo', bg: 'bg-indigo-100', text: 'text-indigo-700' },
  { id: 'violet', label: 'Violet', bg: 'bg-violet-100', text: 'text-violet-700' },
  { id: 'purple', label: 'Purple', bg: 'bg-purple-100', text: 'text-purple-700' },
  { id: 'fuchsia', label: 'Fuchsia', bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
  { id: 'pink', label: 'Pink', bg: 'bg-pink-100', text: 'text-pink-700' },
  { id: 'rose', label: 'Rose', bg: 'bg-rose-100', text: 'text-rose-700' },
];

export const EventTypeManager: React.FC<EventTypeManagerProps> = ({
  isOpen,
  onClose,
  eventTypes,
  onAddType,
  onEditType,
  onDeleteType
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    theme: 'blue' as const
  });

  const handleAddNew = () => {
    if (!formData.label.trim()) return;

    // Generate a unique ID based on the label
    const id = formData.label.toLowerCase().replace(/\s+/g, '-');

    onAddType({
      id,
      label: formData.label,
      theme: formData.theme
    });

    setFormData({ label: '', theme: 'blue' });
  };

  const handleEdit = () => {
    if (!isEditing || !formData.label.trim()) return;

    onEditType(isEditing, {
      label: formData.label,
      theme: formData.theme
    });

    setIsEditing(null);
    setFormData({ label: '', theme: 'blue' });
  };

  const startEdit = (type: EventTypeConfig) => {
    setFormData({
      label: type.label,
      theme: type.theme
    });
    setIsEditing(type.id);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ label: '', theme: 'blue' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Event Types">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        {/* Add/Edit Form */}
        <div className="bg-card p-4 rounded-xl border border-border">
          <h3 className="font-bold text-foreground mb-3 text-lg">
            {isEditing ? 'Edit Event Type' : 'Add New Event Type'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Type Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary"
                placeholder="e.g. Workshop"
                value={formData.label}
                onChange={e => setFormData({...formData, label: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Color Theme</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {COLOR_THEMES.map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setFormData({...formData, theme: theme.id as any})}
                    className={`p-2 rounded-lg border ${formData.theme === theme.id ? 'ring-2 ring-primary ring-offset-2' : 'border-border'} ${theme.bg} ${theme.text} text-[10px] sm:text-xs`}
                  >
                    <span className="font-medium">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 text-muted-foreground text-sm font-bold hover:bg-muted rounded-lg transition-all flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-all flex-1 sm:flex-none"
                  >
                    Update Type
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 flex-1"
                >
                  <Plus size={16} /> Add Type
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Existing Event Types List */}
        <div>
          <h3 className="font-bold text-foreground mb-3 text-lg">Current Event Types</h3>
          <div className="space-y-2">
            {eventTypes.map(type => {
              const theme = COLOR_THEMES.find(t => t.id === type.theme) || COLOR_THEMES[0];
              return (
                <div
                  key={type.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-card rounded-lg border border-border gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${theme.bg} ${theme.text} flex items-center justify-center text-xs font-bold`}>
                      {type.label.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{type.label}</div>
                      <div className="text-xs text-muted-foreground capitalize">{type.theme}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => startEdit(type)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteType(type.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            {eventTypes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No event types created yet
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};