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
  fetchClient,
  removeClient,
  changeStateTrue,
} from "../../../redux/slices/clientSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from '@mui/material';
// import EditCategorie from "./EditCategorie";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Client() {
  const dispatch = useDispatch();
  const { loading, clientList, error, updateState, response } = useSelector(
    (state) => state.clientKey
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);


  const deleteClient = (id) => {
    dispatch(removeClient(id));
    handleClickSnackbar();
  };

  const handleClickSnackbar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      field: 'photo_url',
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
            alt={params.row.nom_client}
            sx={{ marginTop: 1 }}
          />
        )
      }
    },
    {
      field: 'nom_client', headerName: 'Nom',width:250,
    },
    {
      field: 'adresse', headerName: 'Adresse',width:150,
    },
    {
      field: 'telephone', headerName: 'Télephone',
    },
    {
      field: 'username', headerName: 'Nom d\'utilisateur'
    },
    {
      field: 'email',width:150, headerName: 'Email'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => {


        const handleDelete = () => {
          const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet client ?');
          if (confirmDelete) {
            deleteClient(params.row.id)
          }
        };

        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
      <Box sx={{ height: 400, width: '100%', mt: 1 }}>
        <DataGrid
          rows={clientList}
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
            ? "Client ajoutée avec succès"
            : response === "delete"
              ? "Client supprimée avec succès"
              : response === "update"
                ? "Client modifié avec succès"
                : null}
        </Alert>
      </Snackbar>
    </Box>

  );
}