import React, {useState} from 'react'

export default function EmotionalIntelligenceTableData({moduleType, moduleData})
{
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };
  return (
    <div>EmotionalIntelligenceTableData</div>
  )
}
