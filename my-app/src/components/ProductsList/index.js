import React, { useState, useMemo, useEffect, Fragment } from "react";
import { Product } from "../Product";

import { List, Item } from "./styles";
import { SearchInput, PlusBtn, ButtonsContainer } from "./styles";

import { Modal } from "./../../Modal";
import { generateList } from "./../../Api/index";

export const ProductsList = (props) => {
  const [filter, setFilter] = useState("");
  // La lista que vamos generando pero nunca la vemos
  const [carList, setCarList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [generatedList, setGeneratedList] = useState({
    data: [],
    goToBuy: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }
  function handleAddProduct(id) {
    let Newlist = [...carList];
    let isNew = true;
    for (let index = 0; index < Newlist.length; index++) {
      const element = Newlist[index];
      // Si el id es encontrado se suma la cantidad + 1
      if (element.id === id) {
        Newlist[index].quantity = Newlist[index].quantity + 1;
        isNew = false;
        break;
      }
    }
    //Si el producto es nuevo se agrega un nuevo objeto
    if (isNew) Newlist.push({ id: id, quantity: 1 });
    setCarList(Newlist);
  }
  function handleRemoveProduct(id) {
    let Newlist = [...carList];
    for (let index = 0; index < Newlist.length; index++) {
      const element = Newlist[index];
      if (element.id === id) {
        Newlist[index].quantity = Newlist[index].quantity - 1;
        break;
      }
    }
    setCarList(Newlist);
  }
  function handleSendDatatoApi(response) {
    setGeneratedList({
      data: response.data,
      goToBuy: false,
    });
    toggleModal();
  }
  useMemo(() => {
    let currentList = [];
    if (generatedList.goToBuy) {
      currentList = generatedList.data.list;
    } else {
      currentList = props.api;
    }
    const products = currentList.filter((product) => {
      //Si no está comprando
      if (!generatedList.goToBuy) {
        for (let index = 0; index < carList.length; index++) {
          const element = carList[index];
          if (product.id === element.id) {
            product.quantity = element.quantity;
          }
        }
      }
      return product.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredProducts(products);
  }, [props.api, carList, filter, generatedList]);

  useEffect(() => {
    let carListClone = [...carList];
    let reload = false;
    for (let index = 0; index < carListClone.length; index++) {
      const element = carListClone[index];
      if (element.quantity === 0) {
        carListClone.splice(index, 1);
        reload = true;
      }
    }
    if (reload) {
      setCarList(carListClone);
    }
  }, [carList]);

  useEffect(() => {
    setFilteredProducts(props.api);
  }, [props.api]);
  return (
    <Fragment>
      <PlusBtn className={carList.length >= 1 ? "visible" : "invisible"}>
        {generatedList.goToBuy ? (
          <button className="btn btn-danger btn-sm visible rojito">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/maps/search/?api=1&query=29.098370919338887,-110.9259108756669"
            >
              Go to Ley kino
            </a>
          </button>
        ) : (
          <ButtonsContainer>
            <button className="btn btn-sm invisible">Go to Ley kino</button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                generateList(carList, handleSendDatatoApi);
              }}
            >
              Generate List !
            </button>
          </ButtonsContainer>
        )}
      </PlusBtn>
      <SearchInput
        type="text"
        placeholder="Buscar producto"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <List>
        {filteredProducts.length
          ? filteredProducts.map((product) => {
              return (
                <Item key={"product-" + product.id}>
                  <Product
                    buying={generatedList.goToBuy}
                    {...product}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                  />
                </Item>
              );
            })
          : null}
      </List>
      {modalVisible && !generatedList.goToBuy && (
        <Modal
          toggleModal={toggleModal}
          generatedList={generatedList.data}
          setGeneratedList={setGeneratedList}
        />
      )}
    </Fragment>
  );
};
