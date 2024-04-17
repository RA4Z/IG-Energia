import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
    open: any
}

export default function Loading({ open }: Props) {
    return (
        <>
            {open === true && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
        </>
    )
}