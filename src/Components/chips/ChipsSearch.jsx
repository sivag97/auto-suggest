import React, { Component } from "react";
import Downshift from "downshift";

import { css, Item, Input, Menu } from "./Styles";
import { getStringItems } from "../utils";

class ChipsSearch extends Component {
  state = {
    value: ""
  };

  onKeyDown = event => {
    const { value } = this.state;
    if (event.keyCode === 8 && !value) {
      this.props.removeLast();
    }
  };

  handleStateChange = changes => {
    if (changes.hasOwnProperty("selectedItem")) {
      if (changes.selectedItem) {
        this.setState({ value: "" });
        this.props.onSelect({
          id: changes.selectedItem.toLowerCase(),
          name: changes.selectedItem
        });
      }
    } else if (changes.hasOwnProperty("inputValue")) {
      this.setState({ value: changes.inputValue });
      this.props.removeHighlight();
    }
  };

  render() {
    const { value } = this.state;
    const { chipsList } = this.props;
    return (
      <div
        {...css({
          display: "flex",
          flexDirection: "column",
          marginTop: 50,
          textAlign: "center"
        })}
      >
        <Downshift selectedItem={value} onStateChange={this.handleStateChange}>
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            isOpen,
            selectedItem,
            inputValue,
            highlightedIndex
          }) => (
            <div {...css({ width: 250, margin: "auto" })}>
              <div {...css({ position: "relative" })}>
                <Input
                  {...getInputProps({
                    isOpen,
                    placeholder: "Enter a name",
                    onKeyDown: this.onKeyDown
                  })}
                />
              </div>
              <div {...css({ position: "relative" })}>
                <Menu {...getMenuProps({ isOpen })}>
                  {isOpen
                    ? getStringItems(inputValue)
                        .filter(
                          item =>
                            !chipsList.find(({ id }) => {
                              return id === item.toLowerCase();
                            })
                        )
                        .map((item, index) => (
                          <Item
                            key={item.id}
                            {...getItemProps({
                              item,
                              index,
                              isActive: highlightedIndex === index,
                              isSelected: selectedItem === item
                            })}
                          >
                            <img
                              height="25px"
                              width="25px"
                              alt="user"
                              src="https://img.icons8.com/dotty/80/000000/user.png"
                            />{" "}
                            {item}
                          </Item>
                        ))
                    : null}
                </Menu>
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default ChipsSearch;
