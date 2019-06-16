import React, { Component } from "react";
import ChipsSearch from "./ChipsSearch";
import { Chip, Image, ControllerButton, Container } from "./Styles";
import { XIcon } from "../utils";

class Chips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chipsList: [],
      highlightLast: false
    };
  }

  handleSelect = ({ id, name }) => {
    this.setState(prevState => ({
      chipsList: [...prevState.chipsList, { id, name }]
    }));
  };

  removeChip = chipId => {
    this.setState(prevState => ({
      chipsList: prevState.chipsList.filter(({ id }) => chipId !== id),
      highlightLast: false
    }));
  };

  removeLast = () => {
    const { chipsList, highlightLast } = this.state;
    if (highlightLast) {
      this.removeChip(chipsList[chipsList.length - 1].id);
    } else {
      this.setState({
        highlightLast: true
      });
    }
  };

  removeHighlight = () =>
    this.setState({
      highlightLast: false
    });

  renderChips = () => {
    const { chipsList, highlightLast } = this.state;
    return chipsList.map((chip, index) => (
      <Chip
        highlightItem={highlightLast && index === chipsList.length - 1}
        key={chip.id}
      >
        <Image
          alt="user"
          src="https://img.icons8.com/dotty/80/000000/user.png"
        />
        {chip.name}
        <ControllerButton onClick={() => this.removeChip(chip.id)}>
          <XIcon />
        </ControllerButton>
      </Chip>
    ));
  };

  render() {
    return (
      <Container>
        {this.renderChips()}
        <ChipsSearch
          chipsList={this.state.chipsList}
          onSelect={this.handleSelect}
          onRemoveLast={this.removeLast}
          onRemoveHighlight={this.removeHighlight}
        />
      </Container>
    );
  }
}

export default Chips;
