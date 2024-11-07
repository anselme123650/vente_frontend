import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategorie,
  fetchCategorie,
  removeCategorie,
  modifiedCategorie,
  changeStateTrue,
  changeStateFalse,
} from "../../../redux/slices/categorieSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddCategorie from "./AddCategorie";
import { IconButton } from '@mui/material';
import EditCategorie from "./EditCategorie";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Categorie() {
  const dispatch = useDispatch();
  const { loading, categorieList, error, updateState, response } = useSelector(
    (state) => state.categorieKey
  );
  const [open, setOpen] = useState(false);
  const [categorie, setCategorie] = useState(null);
  const [openAddModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseAddModal = () => setOpenModal(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    dispatch(fetchCategorie());
  }, [dispatch]);


  const deleteCategorie = (id) => {
    dispatch(removeCategorie(id));
    handleClickSnackbar();
  };

  const handleClickSnackbar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: 'nom_categorie', headerName: 'Catégorie', width: 400 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const handleEdit = () => {
          setCategorie(params.row)
          dispatch(changeStateTrue());
          handleOpenEditModal()
        };

        const handleDelete = () => {
          const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
          if (confirmDelete) {
            deleteCategorie(params.row.id)
          }
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    }

  ];


  return (
    <Box component="div" style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
      <Button variant="contained" size='small' onClick={handleOpenAddModal} startIcon={<AddCircleOutlineIcon />}>
        Ajouter
      </Button>
      <Box sx={{ height: 400, width: '100%',mt:1 }}>
        <DataGrid
          rows={categorieList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {response === "add"
            ? "Catégorie ajoutée avec succès"
            : response === "delete"
              ? "Catégorie supprimée avec succès"
              : response === "update"
                ? "Catégorie modifié avec succès"
                : null}
        </Alert>
      </Snackbar>
      <AddCategorie open={openAddModal} handleClose={handleCloseAddModal}  onAlert={handleClickSnackbar} />
      {openEditModal && <EditCategorie open={openEditModal} handleClose={handleCloseEditModal} data={categorie} onAlert={handleClickSnackbar} />}
    </Box>

  );
}