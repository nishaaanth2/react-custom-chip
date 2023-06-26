import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



export default function ChipsArray() {
  
  const [chipData, setChipData] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const handleDelete = (chipToDelete: string) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleEdit = (index: number, label: string) => {
    setEditingIndex(index);
    setEditValue(label);
  };

  const handleSave = (index: number) => {
    if (editValue.trim() !== '') {
      setChipData((chips) => {
        const updatedChips = [...chips];
        updatedChips[index] = editValue.trim();
        return updatedChips;
      });
    }
    setEditingIndex(null);
    setEditValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSave(editingIndex!);
    }
  };

  const handleChipCreate = () => {
    setChipData((chips) => [...chips, '']);
    setEditingIndex(chipData.length);
  };
  return (
    <Paper
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                  }}
                  component="ul"
                >
                  {chipData.map((label, index) => (
                    <ListItem key={index}>
                      {editingIndex === index ? (
                        <Chip
                          label={
                            <input
                              id={`chip-input-${index}`}
                              type="text"
                              value={editValue}
                              onChange={handleInputChange}
                              onKeyDown={handleInputKeyDown}
                              autoFocus
                            />
                          }
                          onDelete={() => handleSave(index)}
                          deleteIcon={<DoneIcon />}
                        />
                      ) : (
                        <Chip
                          label={label}
                          onDelete={handleDelete(label)}
                          onClick={() => handleEdit(index, label)}
                          clickable
                        />
                      )}
                    </ListItem>
                  ))}
                  {editingIndex === null && (
                    <ListItem>
                      <Chip
                        label="Type Column label and press Enter"
                        onDelete={null}
                        onClick={handleChipCreate}
                        clickable
                        variant="outlined"
                        color="primary"
                      />
                    </ListItem>
                  )}
                </Paper>
  );
}
