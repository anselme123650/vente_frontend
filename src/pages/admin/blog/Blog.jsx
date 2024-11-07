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
    fetchBlog,
    removeBlog,
    changeStateTrue,
} from "../../../redux/slices/blogSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from '@mui/material';
import EditBlog from "./EditBlog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBlog from "./AddBlog";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
export default function Blog() {
    const dispatch = useDispatch();
    const { loading, blogList, error, updateState, response } = useSelector(
        (state) => state.blogKey
    );
    const [open, setOpen] = useState(false);
    const [blog, setBlog] = useState(null);
    const [openAddModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenAddModal = () => setOpenModal(true);
    const handleCloseAddModal = () => setOpenModal(false);
    const handleOpenEditModal = () => {
        setOpenEditModal(true)
    };
    const handleCloseEditModal = () => setOpenEditModal(false);

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);


    const deleteBlog = (id) => {
        dispatch(removeBlog(id));
        handleClickSnackbar();
    };

    const handleClickSnackbar = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const columns = [
        { field: 'titre', headerName: 'Titre', width: 400 },

        {
            field: 'date', headerName: 'Date', renderCell: (params) => {
                return params.row.date ? format(new Date(params.row.date), "dd/mm/yyyy", { locale: fr }) : '';
            },
        },
        { field: 'description', headerName: 'Description', width: 280 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => {
                const handleEdit = () => {
                    setBlog(params.row)
                    dispatch(changeStateTrue());
                    handleOpenEditModal()
                };

                const handleDelete = () => {
                    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette blogs ?');
                    if (confirmDelete) {
                        deleteBlog(params.row.id)
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
                    rows={blogList}
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
                        ? "Blog ajoutée avec succès"
                        : response === "delete"
                            ? "Blog supprimée avec succès"
                            : response === "update"
                                ? "Blog modifié avec succès"
                                : null}
                </Alert>
            </Snackbar>
            <AddBlog open={openAddModal} handleClose={handleCloseAddModal} onAlert={handleClickSnackbar} />
            {openEditModal && <EditBlog open={openEditModal} handleClose={handleCloseEditModal} data={blog} onAlert={handleClickSnackbar} />}
        </Box>

    );
}