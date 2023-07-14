import styled from "styled-components";
import Logo from "./assets/Logo.svg";
import { useEffect, useState } from "react";
import SearchResult from "./Conponents/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilterdData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  const filterFood = (type) => {
    if (type === "all") {
      setFilterdData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterdData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  useEffect(() => {
    const FoodData = async () => {
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();
        setData(json);
        setLoading(false);
        setFilterdData(json);
        console.log(json);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    FoodData();
  }, []);

  const searchfood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFilterdData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterdData(filter);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading....</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src={Logo} alt="logo" />
          <div className="search">
            <input onChange={searchfood} placeholder="search food" />
          </div>
        </div>
      </TopContainer>
      <FilterContainer>
        {filterBtns.map((value) => (
          <Button
            isSelected={selectedBtn === value.type}
            key={value.name}
            onClick={() => filterFood(value.type)}
          >
            {value.name}
          </Button>
        ))}
      </FilterContainer>
      <SearchResult data={filteredData} />
    </Container>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
      padding: 0 4px;
    }
  }

  @media (0 <width <600px) {
    flex-direction: column;
    height:60px;
  }
`;

const FilterContainer = styled.section`
  justify-content: center;
  display: flex;
  gap: 12px;
`;

export const Button = styled.button`
  background: ${({isSelected})=>(isSelected ? 'red' : '#ff4343')};
  outline: 1px solid ${({isSelected})=>(isSelected ? 'white' : '#ff4343')};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
`;
