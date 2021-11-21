import React, { useState, useEffect } from "react";
import { Box, FlatList, Text } from "react-native";

import { ScrollView } from 'react-native-gesture-handler';


export default function PrintProducts() {
const productsURL = "http://aeropolyplast.eu/api/displayAll";

const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

const fetchData = async () => {
const resp = await fetch(productsURL);
const data = await resp.json();
setData(data);
setLoading(false);
};

useEffect(() => {
    fetchData();
  }, []);

renderItem = ({ item }) => {
    return (
    <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
        {item.naziv}
    </Box>
    );
};


return (
    <ScrollView>
      
      <Box> Fetch API</Box>
        {loading && <Box>Loading..</Box>}
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      
    </ScrollView>
  );

}