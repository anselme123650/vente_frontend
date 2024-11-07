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
  fetchCommande,
  removeCommande
} from "../../../redux/slices/commandeSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from '@mui/material';
// import EditCategorie from "./EditCategorie";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
export default function Commande() {
  const dispatch = useDispatch();
  const { commandeList,response } = useSelector(
    (state) => state.commandeKey
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCommande());
  }, [dispatch]);


  const deleteCommande = (id) => {
    dispatch(removeCommande(id));
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
      field: 'num_bon_commande', headerName: 'No bon de commande',
    },
    {
      field: 'date_commande', headerName: 'Date',renderCell: (params) => {
        return params.row.date_commande ? format(new Date(params.row.date_commande), "dd/mm/yyyy", { locale: fr }) : '';
      },
    },
    {
      field: 'nom_client', headerName: 'Nom',width:250,renderCell: (params) => {
        return params.row.user.nom_client
      },
    },
    {
      field: 'telephone', headerName: 'Télephone',width:100,renderCell: (params) => {
        return params.row.user.telephone
      },
    },
    {
      field: 'adresse', headerName: 'Adresse',width:150,renderCell: (params) => {
        return params.row.user.adresse
      },
    },
    {
      field: 'prix_total', headerName: 'Montant en Ar',width:150,renderCell: (params) => {
        return params.row.prix_total
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => {


        const handleDelete = () => {
          const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
          if (confirmDelete) {
            deleteCommande(params.row.id)
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
          rows={commandeList}
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
            ? "Commande ajoutée avec succès"
            : response === "delete"
              ? "Commande supprimée avec succès"
              : response === "update"
                ? "Commande modifié avec succès"
                : null}
        </Alert>
      </Snackbar>
    </Box>

  );
}