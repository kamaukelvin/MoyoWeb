/* eslint-disable react/destructuring-assignment */
import React, { useState, createContext } from "react";

const ModalContext = createContext();
const ModalContextProvider = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const modalClose = () => {
    setModalShow(false);
  };

  return (
    <ModalContext.Provider value={{ modalShow, setModalShow, modalClose }}>
      {props.children}
    </ModalContext.Provider>
  );
};

const ModalConsumer = ModalContext.Consumer;
export { ModalContextProvider, ModalConsumer, ModalContext };