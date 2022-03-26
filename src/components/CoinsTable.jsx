import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CoinList } from "../config/Api";
import { CryptoState } from "../CryptoContext";

// ! styles import
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});
const useStyles = makeStyles(() => ({}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const { currency } = CryptoState();
  const navigate = useNavigate();
  const classes = useStyles();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ nargin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by market Cap
        </Typography>
        <TextField
          label="Search For a Crypto .."
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
            border: "1px solid gold",
            color: "gold",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBCID" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeirght: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow onClick={() => navigate(`/coins/${row.id}`)}>
                      <TableCell
                        component="th"
                        scope="row"
                        styles={{ display: "flex", gap: 15 }}
                      >
                          <img 
                          src={row?.image}
                          alt={row.image}
                          height="50px"
                          style={{ marginBottom: 10 }} 
                           alt="" />

                           <div style={{ 
                               display: "flex",
                               flexDirection: "column" }}>
                                   <span style={{ 
                                       textTransform: "uppercase",
                                       fontSize: 22,
                                    }}>
                                        { row.symbol }
                                   </span>
                                   <span 
                                    style={{ color: "darkgrey" }}
                                   >{row.name}</span>
                           </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
