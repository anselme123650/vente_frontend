import {
  Alert,
  Box,
  Button,
  Snackbar,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduit,
  removeProduit,
  changeStateTrue,
} from "../../../redux/slices/produitSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddProduit from "./AddProduit";
import { IconButton } from '@mui/material';
// import EditCategorie from "./EditCategorie";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Produit() {
  const dispatch = useDispatch();
  const { loading, produitList, error, updateState, response } = useSelector(
    (state) => state.produitKey
  );
  const [open, setOpen] = useState(false);
  const [produit, setProduit] = useState(null);
  const [openAddModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseAddModal = () => setOpenModal(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true)
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    dispatch(fetchProduit());
  }, [dispatch]);


  const deleteProduit = (id) => {
    dispatch(removeProduit(id));
    handleClickSnackbar();
  };

  const handleClickSnackbar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(produitList)
  const columns = [
    {
      field: 'image_url',
      headerName: 'Photo',
      minWidth: 50,
      filterable: false,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return (
          <CardMedia
            component='img'
            height="50"
            image={params.value}
            alt={params.row.nom_produit}
            sx={{ marginTop: 1 }}
          />
        )
      }
    },
    { field: 'nom_produit', headerName: 'Nom', width: 400 },
    { field: 'prix', headerName: 'Prix en Ar' },
    { field: 'qte_stock', headerName: 'Stock' },
    { field: 'description', headerName: 'Description' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const handleEdit = () => {
          setProduit(params.row)
          dispatch(changeStateTrue());
          handleOpenEditModal()
        };

        const handleDelete = () => {
          const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
          if (confirmDelete) {
            deleteProduit(params.row.id)
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
      <Box sx={{ height: 400, width: '100%', mt: 1 }}>
        <DataGrid
          rows={produitList}
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
            ? "Produit ajoutée avec succès"
            : response === "delete"
              ? "Produit supprimée avec succès"
              : response === "update"
                ? "Produit modifié avec succès"
                : null}
        </Alert>
      </Snackbar>
      <AddProduit open={openAddModal} handleClose={handleCloseAddModal} onAlert={handleClickSnackbar} />
      {/* {openEditModal && <EditCategorie open={openEditModal} handleClose={handleCloseEditModal} data={produit} onAlert={handleClickSnackbar} />} */}
    </Box>

  );
}