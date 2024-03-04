
import styled from 'styled-components';
import { UseContext } from '../../context';
import { Badge, Button, IconButton, Rating } from '@mui/material';
import { Close, ExpandLess, ExpandMore, ShoppingCart } from '@mui/icons-material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { COLORS } from '../../constants/contents/color';



const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "68%",
  maxHeight: "76%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  overflowY: "scroll",
  overflowX: "hidden",
};


const CartModal = (props) => {
  const { color } = props
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mode, inCart, setInCart } = React.useContext(UseContext)



  const handleRemove = (item) => {
    const removeItemFromCArt = inCart.filter((i) => i.id !== item.id)
    setInCart(removeItemFromCArt)
  }

  

  return (
    <div>


      <Box sx={{ cursor: "pointer", pr: { md: 3 }, display: "flex" }}>
        <Typography color={color && mode === "dark" ? "black" : "white"} >$ {0}
          <StyledBadge badgeContent={inCart?.length} showZero>
            <ShoppingCart sx={{ ml: 1 }} onClick={handleOpen} />
          </StyledBadge>
        </Typography>

      </Box>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Your cart
              </Typography>
              <Box>
                <Button
                  style={removBtnStyle}
                  onClick={() => setInCart([])}
                >
                  Remove All
                </Button>
              </Box>
            </Box>
            {inCart.map((item) => (
              <Box
                display={"flex"}
                alignItems={"center"}
                mt={3}
              >
                <Box
                  position={"relative"}
                  height={"100px"}
                  width={"100px"}
                  mr={2}
                  sx={{ backgroundColor: "rgb(248, 247, 243)", borderRadius: "8px" }}>
                  <img width={"100%"} height={"100%"} style={{ objectFit: "cover" }} src={item.poster || item.thumbnail} alt="" />
                </Box>
                <Box
                  mt={2}
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >

                  <Typography
                    fontWeight={"light"}
                    fontSize={"large"}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    width={"100px"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <ExpandLess />
                    <Typography
                      fontWeight={400}
                      fontSize={"large"}

                    >
                      {item.quantity}
                    </Typography>
                    <ExpandMore />
                  </Box>
                  <Typography
                    fontWeight={"bold"}
                    color={COLORS.gray.light}
                  >
                    ${item.price}
                  </Typography>
                  <IconButton sx={btnStyle} onClick={() => handleRemove(item)}>
                    <Close color='error' fontSize='small' />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box>
              {inCart.length === 0 &&
                <Typography mt={5} textAlign={"center"}>Your cart is empty</Typography>
              }
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CartModal;
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 0,
    color: "white",
    backgroundColor: 'rgba(82, 81, 81, .8)',
    fontWeight: 500,
    fontSize: '14px',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    border: '1px solid gray',
    padding: '0 4px',
  },
}));

const btnStyle = {
  border: "1px solid gray",
  width: "25px",
  height: "25px",
  padding: 1
}
const removBtnStyle = {
  color: COLORS.pink.hotPink,
  border: "1px solid rgb(238,44,130)",
  borderRadius: "40px",
  px: 5,
  height: "25px",
  fontSize: ".67rem",
  "&:hover": { backgroundColor: COLORS.pink.hotPink, color: "white" },
}